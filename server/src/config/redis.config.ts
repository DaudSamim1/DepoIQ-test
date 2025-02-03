import Redis from "ioredis"
import config from "./index"
import logger from "../utils/logger.util"

const { HOST, PORT, SERVICE_NAME } = config.REDIS

const redis = new Redis({
  host: HOST,
  port: +PORT
})

redis.on("connect", () => {
  logger.info("Connected to Redis", { service: SERVICE_NAME })
})

redis.on("error", (error) => {
  logger.error(`Error connecting to Redis: ${(error as Error).message}`, {
    service: SERVICE_NAME,
    metadata: {
      error: {
        message: (error as Error).message,
        stack: (error as Error).stack
      }
    }
  })
})

export default redis
