import { client, v2 } from "@datadog/datadog-api-client"
import config from "../config"

const { ENVIRONMENT: env, HOSTNAME } = config.SERVER
const { API_KEY, SITE } = config.DATADOG

const configuration = client.createConfiguration({
  authMethods: {
    apiKeyAuth: API_KEY
  }
})

configuration.setServerVariables({
  site: SITE
})

const apiInstance = new v2.LogsApi(configuration)

export async function logToDatadog(
  message: string,
  level: "info" | "error" | "warn" | "ok",
  service: string = "",
  metadata: Record<string, any> = {}
): Promise<void> {
  if (!API_KEY) {
    console.error("Datadog API key is not set. Skipping logging.")
    return
  }

  const logEntry = {
    message,
    ddsource: `server-${env}`,
    ddtags: `env:${env},level:${level},service:${service}`,
    hostname: HOSTNAME,
    service: `server${service ? `-${service}` : ""}`,
    additionalProperties: {
      ...metadata
    }
  }

  try {
    await apiInstance.submitLog({ body: [logEntry] })
  } catch (err) {
    console.error("Failed to submit log to Datadog:", err)
  }
}
