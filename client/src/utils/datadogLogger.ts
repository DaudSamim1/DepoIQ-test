import { datadogLogs } from "@datadog/browser-logs"

let datadogInitialized = false

const env = import.meta.env.VITE_ENV
const clientToken = import.meta.env.VITE_DATADOG_CLIENT_TOKEN
const site = import.meta.env.VITE_DATADOG_SITE

export function initializeDatadog() {
  if (!clientToken) {
    throw new Error("Datadog client token not found")
  }
  if (typeof window !== "undefined" && !datadogInitialized) {
    datadogLogs.init({
      clientToken: clientToken,
      site,
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
      trackAnonymousUser: true,
      env,
      service: "web-logs"
    })

    datadogInitialized = true
    console.info("Datadog initialized")
  }
}

export function logClientMessage(message: string, level: "info" | "error" | "warn" = "info", metadata = {}) {
  if (datadogInitialized) {
    datadogLogs.logger[level](message, metadata)
  } else {
    console[level](message, metadata)
  }
}

export function logClientError(error: Error, metadata = {}) {
  if (datadogInitialized) {
    datadogLogs.logger.error(error.message, { ...metadata, error: error.message })
  } else {
    console.error(error.message, metadata)
  }
}
