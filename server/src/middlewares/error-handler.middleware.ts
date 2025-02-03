import { Request, Response, NextFunction } from "express"
import logger from "../utils/logger.util"

// Custom Error Interface
interface CustomError extends Error {
  status?: number
  code?: string
}

// Error Handling Middleware
const errorHandler = (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.status || 500

  // Log error to Winston
  logger.error("API Error", {
    metadata: {
      status: statusCode,
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method
    }
  })

  // Send JSON response
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code || "UNKNOWN_ERROR",
    status: statusCode
  })
}

export default errorHandler
