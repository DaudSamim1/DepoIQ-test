import React from "react"
import { Button, Card, Result } from "antd"
import { logClientError } from "../utils/datadogLogger"

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo)
    logClientError(error, { component: "ErrorBoundary" })
  }

  handleReload = () => {
    window.location.reload() // Reload the page
  }

  render() {
    if (!navigator.onLine) {
      return (
        <Result
          status="warning"
          title="No Internet Connection"
          subTitle="Please check your internet connection and try again."
          extra={
            <Button type="primary" onClick={this.handleReload}>
              Retry
            </Button>
          }
        />
      )
    }

    if (this.state.hasError) {
      return (
        <Card className="w-full max-w-lg mx-auto mt-10 shadow-lg border border-red-300">
          <Result
            status="500"
            title="Something went wrong"
            subTitle={this.state.error?.message || "An unexpected error occurred."}
            extra={
              <Button type="primary" onClick={this.handleReload}>
                Reload Page
              </Button>
            }
          />
        </Card>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
