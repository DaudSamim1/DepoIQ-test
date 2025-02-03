import http from "http"
import express, { Express, Request, Response } from "express"
import cors from "cors"
import connectMongoDB from "./config/db.config"
import createGraphQLServer from "./config/graphql.config"
import Routes from "./routes"
import errorHandler from "./middlewares/error-handler.middleware"
import morgan from "morgan"
import expressWinston from "express-winston"
import logger from "./utils/logger.util"
import config from "./config"

// Express App Setup
const app: Express = express()

app.use(cors())
app.use(express.json())
// Morgan for concise HTTP request logging
app.use(morgan("combined"))

// Winston for structured request logging
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    expressFormat: true,
    colorize: false
  })
)

// Connect MongoDB
connectMongoDB()

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "success", message: "Welcome to Backend API.", data: null })
})

app.use("/api", Routes)

// Error logging middleware
app.use(expressWinston.errorLogger({ winstonInstance: logger }))

// Error handling middleware
app.use(errorHandler)

// Start Apollo GraphQL Server
;(async () => {
  try {
    const server = createGraphQLServer() // Create server instance
    await server.start().then(() => {
      logger.info("Apollo Server started", {
        service: config.GRAPHQL.SERVICE_NAME
      })
      server.applyMiddleware({ app } as any) // Apply middleware
    })

    const httpServer = http.createServer(app)
    const PORT = process.env.PORT || 4000

    httpServer.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`, {
        service: config.SERVER.SERVICE_NAME
      })
      logger.info(`GraphQL playground available at http://localhost:${PORT}${server.graphqlPath}`, {
        service: config.GRAPHQL.SERVICE_NAME
      })
    })
  } catch (error) {
    console.error(error)
    logger.error("Error starting Apollo Server", {
      service: config.GRAPHQL.SERVICE_NAME,
      metadata: {
        error: {
          message: (error as Error).message,
          stack: (error as Error).stack
        }
      }
    })
    process.exit(1)
  }
})()
