import mongoose from "mongoose"
import config from "./index"
import logger from "../utils/logger.util"

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return

    await mongoose.connect(config.MONGO.URL)
    logger.info("Connected to MongoDB", { service: config.MONGO.SERVICE_NAME })
  } catch (error) {
    logger.error("Error connecting to MongoDB", {
      service: config.MONGO.SERVICE_NAME,
      metadata: {
        error: {
          message: (error as Error).message,
          stack: (error as Error).stack
        }
      }
    })
    process.exit(1)
  }
}

export default connectMongoDB
