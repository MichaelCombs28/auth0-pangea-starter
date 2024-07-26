import { PangeaHTTPClient } from "./http_client"

/**
 * Makes API calls to Pangea's vault service.
 *
 * This client includes a cache
 */
export class VaultClient extends PangeaHTTPClient {
  secretsCache: TokenCache
  constructor(
    tokenCache?: TokenCache,
    resolveIssue: boolean = true,
    retries: number = 5,
    exponentialBackoff: number = 0.25,
    protocol: string = "https"
  ) {
    super("vault", resolveIssue, retries, exponentialBackoff, protocol)
    this.secretsCache = tokenCache ? tokenCache : new Map<string, string>()
  }

  async getToken(): Promise<string> {
    return process.env.PANGEA_TOKEN!
  }

  async fetchServiceToken(serviceTokenId: string): Promise<string> {
    const cachedToken = this.secretsCache.get(serviceTokenId)
    if (cachedToken) {
      return cachedToken
    }

    const resp = await this.request("/v1/get", { id: serviceTokenId })
    if (resp.status != 200) {
      const text = await resp.text()
      throw new Error(`Failed to fetch vault token: ${text}`)
    }

    const {
      result: {
        current_version: { secret: token },
      },
    } = await resp.json()
    this.secretsCache.set(serviceTokenId, token)
    return token
  }

  /**
   * Fetch a set of secrets by providing a record of keys pointing to
   * Pangea secret IDs, generally a map of human readable names to
   * secret IDs.
   */
  async fetchSecrets<T extends Record<string, string>>(
    secretsRequest: T
  ): Promise<{ [k in keyof T]: string }> {
    const idsToNames = Object.entries(secretsRequest).reduce(
      (acc, [key, value]) => {
        const typedValue = value as T[keyof T]
        if (!acc[typedValue]) {
          acc[typedValue] = []
        }
        acc[typedValue].push(key as keyof T)
        return acc
      },
      {} as { [K in T[keyof T]]: (keyof T)[] }
    )

    const results = {} as { [K in keyof T]: string }
    const unconsumed = new Set<T[keyof T]>(
      Object.values(secretsRequest) as T[keyof T][]
    )

    unconsumed.forEach((k: T[keyof T]) => {
      const value = this.secretsCache.get(k)
      if (value && value.length > 0) {
        const names = idsToNames[k]
        for (let name of names) {
          results[name] = value
        }
        unconsumed.delete(k)
      }
    })

    if (unconsumed.size == 0) {
      return results
    }

    const req = {
      filter: { id__in: Array.from(unconsumed) },
      include_secrets: true,
    }

    const resp = await this.request("/v1/list", req)
    if (resp.status != 200) {
      const text = await resp.text()
      throw new Error(`Failed to fetch vault secrets: ${text}`)
    }

    const {
      result: { items },
    }: { result: { items: SecretItem<T>[] } } = await resp.json()

    for (let item of items) {
      if (
        item.item_state != "enabled" ||
        item.current_version.state != "active"
      ) {
        throw new Error(
          `Key named ${idsToNames[item.id].toString()} is in an inactive state, go to Pangea's vault service to re-enabler`
        )
      }
      const names = idsToNames[item.id]
      for (let name of names) {
        results[name] = item.current_version.secret
      }
      unconsumed.delete(item.id)
      this.secretsCache.set(item.id, item.current_version.secret)
    }

    if (unconsumed.size > 0) {
      const keys = Array.from(unconsumed).map((k: T[keyof T]) => idsToNames[k])
      throw new Error(`Key(s) ${keys} do not exist`)
    }
    return results
  }
}

interface SecretItem<T extends Record<string, string>> {
  id: T[keyof T]
  item_state: "enabled" | string
  current_version: {
    secret: string
    state: "active" | string
  }
}

/**
 * Default vault client used by the rest of the application.
 *
 * Uses default cache since next.js api functions will only be warm
 * for a short period of time, so no TTL is needed.
 */
export const defaultVaultClient = new VaultClient()

/**
 * Interface for cache used by vault client
 */
export interface TokenCache {
  get(key: string): string | undefined
  set(key: string, token: string): this
}
