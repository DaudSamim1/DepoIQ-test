import * as dotenv from "dotenv"

dotenv.config()

const config = {
  MONGO: {
    SERVICE_NAME: "MongoDB",
    URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/development",
    ENCRYPTION_KEY: process.env.MONGO_ENCRYPTION_KEY || ""
  },
  SERVER: {
    SERVICE_NAME: "Server",
    ENVIRONMENT: process.env.NODE_ENV || "development",
    HOSTNAME: process.env.HOSTNAME || "127.0.0.1",
    PORT: process.env.PORT || 4000
  },
  REDIS: {
    SERVICE_NAME: "Redis",
    HOST: process.env.REDIS_HOST || "127.0.0.1",
    PORT: process.env.REDIS_PORT || 6379
  },
  CLERK: {
    SERVICE_NAME: "Clerk",
    PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "",
    SECRET_KEY: process.env.CLERK_SECRET_KEY || ""
  },
  DATADOG: {
    SERVICE_NAME: "Datadog",
    API_KEY: process.env.DATADOG_API_KEY || "",
    SITE: process.env.DATADOG_SITE || ""
  },
  GRAPHQL: {
    SERVICE_NAME: "GraphQL"
  }
}

export default config
