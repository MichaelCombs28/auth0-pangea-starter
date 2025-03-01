import { interFont } from "../font"

/**
 * a promisified sleep function for HTTP backoffs
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Theme used by MUI components to conform to the established styles in the template
 * where parameterization is possible.
 */
export const THEME_OPTIONS = {
  spacing: 8,
  typography: {
    fontFamily: interFont.style.fontFamily,
    h6: {
      fontSize: "24px",
      fontWeight: "600",
    },
    body2: {
      fontSize: "14px",
      fontWeight: "400",
    },
    button: {
      fontSize: "14px",
      fontWeight: "400",
    },
    overline: {
      fontWeight: "500",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          height: "40px",
          borderRadius: "4px",
          "&.Mui-disabled": {
            color: "hsl(var(--muted-foreground))",
          },
        },
        text: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "hsl(var(--foreground))",
          "&.Mui-disabled": {
            color: "hsl(var(--muted-foreground))",
          },
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          label: {
            color: "hsl(var(--foreground))",
          },
          input: {
            fontSize: "14px",
            fontWeight: "400",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          backgroundColor: "hsl(var(--field))",
          input: {
            height: "40px",
            color: "hsl(var(--foreground))",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ":has(> input)": {
            height: "40px",
          },
          borderRadius: "4px",
          backgroundColor: "hsl(var(--field))",
          "&.Mui-disabled": {
            color: "hsl(var(--muted-foreground))",
            "-webkit-text-fill-color": "hsl(var(--muted-foreground))",
          },
          input: {
            height: "initial",
            color: "hsl(var(--foreground))",
            "&.Mui-disabled": {
              color: "hsl(var(--muted-foreground))",
              "-webkit-text-fill-color": "hsl(var(--muted-foreground))",
            },
          },
          fieldset: {
            "border-color": "hsl(var(--muted-foreground))",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          lineHeight: "initial",
          "&.MuiInputLabel-shrink": {
            lineHeight: "1.4375em",
          },
          "&.Mui-focused": {
            color: "hsl(var(--accent))",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "hsl(var(--muted-foreground))",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "hsl(var(--foreground))",
          textDecoration: "none",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          "&.MuiList-padding": {
            padding: "0",
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          ".pretty-json-container": {
            ".object-key": {
              color: "hsl(var(--foreground))!important",
            },
          },
          ".MuiDataGrid-root": {
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "hsl(var(--field))",
            },
            ".MuiDataGrid-row.Mui-selected": {
              backgroundColor: "hsl(var(--card))",
              ".PangeaDataGrid-Pinned-Right": {
                backgroundColor: "hsl(var(--card))",
              },
              ":hover": {
                backgroundColor: "hsl(var(--card))",
                ".PangeaDataGrid-Pinned-Right": {
                  backgroundColor: "hsl(var(--card))",
                },
              },
            },
            ".MuiDataGrid-row": {
              ":hover": {
                backgroundColor: "hsl(var(--card))",
                ".PangeaDataGrid-Pinned-Right": {
                  backgroundColor: "hsl(var(--card))",
                },
              },
            },
            ".PangeaDataGrid-ExpansionRow, .PangeaDataGrid-Chip": {
              backgroundColor: "hsl(var(--card))",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(var(--accent))",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "hsl(var(--foreground))",
          "&.MuiCheckbox-colorPrimary": {
            color: "hsl(var(--foreground))",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(var(--background))",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          backgroundColor: "hsl(var(--field))",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        root: {
          ".MuiBox-root.widget, .PangeaPanel-root": {
            backgroundColor: "hsl(var(--field))",
            borderRadius: "8px",
          },
          ".PangeaInput-root": {
            borderRadius: "4px",
            backgroundColor: "hsl(var(--field))",
          },
          ".Pangea-Flyout-Container": {
            backgroundColor: "hsl(var(--foreground))",
          },
        },
      },
    },
    MuiScopedCssBaseline: {
      styleOverrides: {
        root: {
          ".MuiBox-root.widget, .PangeaPanel-root": {
            backgroundColor: "hsl(var(--field))",
            borderRadius: "8px",
          },
          ".PangeaInput-root": {
            borderRadius: "4px",
            backgroundColor: "hsl(var(--field))",
          },
          ".Pangea-Flyout-Container": {
            backgroundColor: "hsl(var(--foreground))",
          },
        },
      },
    },
  },
  palette: {
    action: {
      main: "hsl(var(--foreground))",
      active: "hsl(var(--foreground))",
    },
    info: {
      light: "hsl(var(--accent))",
      main: "#0288d1",
      dark: "#01579b",
    },
    primary: {
      main: "hsl(var(--primary))",
      contrastText: "hsl(var(--primary-foreground))",
    },
    secondary: {
      main: "hsl(var(--secondary))",
      contrastText: "hsl(var(--secondary-foreground))",
    },
    text: {
      primary: "hsl(var(--foreground))",
      secondary: "hsl(var(--muted-foreground))",
    },
    divider: "hsl(var(--muted-foreground))",
    background: {
      default: "hsl(var(--field))",
      paper: "hsl(var(--field))",
    },
  },
}

/**
 * API Proxy for use by the secure share component
 */
export const StoreCallbackHandler = {
  get: storeProxyFetch("/v1beta/get"),
  list: storeProxyFetch("/v1beta/list"),
  share: {
    list: storeProxyFetch("/v1beta/share/link/list"),
    get: storeProxyFetch("/v1beta/share/link/get"),
    delete: storeProxyFetch("/v1beta/share/link/delete"),
    create: storeProxyFetch("/v1beta/share/link/create"),
    send: storeProxyFetch("/v1beta/share/link/send"),
  },
  delete: storeProxyFetch("/v1beta/delete"),
  update: storeProxyFetch("/v1beta/update"),
  upload: upload,
  folderCreate: storeProxyFetch("/v1beta/folder/create"),
}

// Private

function storeProxyFetch(path: string) {
  return async function (req: Record<any, any>) {
    const resp = await fetch(`/api/pangea/share`, {
      method: "POST",
      body: JSON.stringify({ path: path, params: { ...req } }),
      cache: "no-cache",
      credentials: "same-origin",
    })

    if (resp.status > 299 || resp.status < 200) {
      const text = await resp.text()
      console.error(`Error: ${text}; while performing ${path}`)
      throw resp
    }

    const json = await resp.json()
    return json
  }
}

async function upload(data: FormData, contentType: string) {
  // /v1/put
  const resp = await fetch(`/api/pangea/share/upload`, {
    method: "POST",
    body: data,
    cache: "no-cache",
    credentials: "same-origin",
  })
  return await resp.json()
}
