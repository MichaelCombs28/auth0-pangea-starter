import { defaultVaultClient } from "./pangea/vault"

function arrayToEnvs(values: string[]): Record<string, string> {
  const result = {} as Record<string, string>
  for (let value of values) {
    const val = process.env[value]
    if (!val) {
      throw new Error(`Environment value ${value} is missing`)
    }
    result[value] = val
  }
  return result
}

let envValues = arrayToEnvs([
  "APP_BASE_URL",
  "NEXT_PUBLIC_AUTH0_DOMAIN",
  "AUTH0_ADMIN_ROLE_ID",
  "AUTH0_MEMBER_ROLE_ID",
  "DEFAULT_CONNECTION_ID",
  "CUSTOM_CLAIMS_NAMESPACE",
  "PANGEA_DOMAIN",
  "PANGEA_TOKEN",
  "PANGEA_SERVICE_TOKEN_ID",
  "NEXT_PUBLIC_PANGEA_AUDIT_AUTH0_CONFIG_ID",
  "NEXT_PUBLIC_PANGEA_AUDIT_SERVICES_CONFIG_ID",
])

const SECRETS = [
  "AUTH0_MANAGEMENT_API_DOMAIN",
  "AUTH0_MANAGEMENT_CLIENT_ID",
  "AUTH0_MANAGEMENT_CLIENT_SECRET",
  "AUTH0_MANAGEMENT_CLIENT_ID",
  "AUTH0_MANAGEMENT_CLIENT_SECRET",
  "SESSION_ENCRYPTION_SECRET",
  "AUTH0_CLIENT_ID",
  "AUTH0_CLIENT_SECRET",
]

const envs = { ...envValues, ...arrayToEnvs(SECRETS) }

export const Env: () => Promise<Record<string, string>> = (function () {
  let cached: Record<string, string>
  async function EnvF(): Promise<Record<string, string>> {
    if (!process.env.USE_PANGEA_VAULT) {
      return envs
    }

    if (cached) {
      return cached
    }
    const needToBeFetched = SECRETS.reduce(
      (acc, s) => ({ ...acc, [s]: envs[s] }),
      {} as Record<string, string>
    )
    const secrets = await defaultVaultClient.fetchSecrets(needToBeFetched)
    cached = { ...envValues, ...secrets }
    return cached
  }
  return EnvF
})()
