import winston from "winston"
import path from "path"
import { logToDatadog } from "./datadog.util"
import config from "../config"
import TransportStream from "winston-transport"

const { ENVIRONMENT: env } = config.SERVER
const { API_KEY } = config.DATADOG

// Define log format
const logFormat = winston.format.combine(winston.format.timestamp(), winston.format.json())

// Define transports (console & file)
const transports: winston.transport[] = [
  // Console logging
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), winston.format.simple())
  }),
  // File logging
  new winston.transports.File({
    filename: path.join(__dirname, `../../logs/server-${env}.log`)
  })
]

// Custom Datadog Transport
class DatadogTransport extends TransportStream {
  async log(info: winston.LogEntry, callback: () => void) {
    try {
      await logToDatadog(
        info.message,
        info.level as "info" | "error" | "warn" | "ok",
        info.service || null,
        info.metadata || {}
      )
    } catch (error) {
      console.error("Datadog logging error:", error)
    }

    callback()
  }
}

// Add Datadog transport if API key is set
if (API_KEY) {
  transports.push(new DatadogTransport())
}

// Create Winston logger
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports
})

export default logger
