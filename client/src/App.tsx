import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import MainLayout from "./layout"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./contants/routes"
import { ROUTES_ENDPOINTS } from "./contants/routes_endpoints"
import { initializeDatadog } from "./utils/datadogLogger"

const App: React.FC = () => {
  const { isSignedIn } = useUser()

  useEffect(() => {
    initializeDatadog() // Initialize Datadog Logging
  }, [])

  return (
    <Router>
      <Routes>
        {isSignedIn
          ? PRIVATE_ROUTES.map(({ component: Component, to: path, isLayout }) =>
              isLayout ? (
                <Route element={<MainLayout />} key={path + "--with-layout"}>
                  <Route path={path} element={<Component />} />
                </Route>
              ) : (
                <Route path={path} element={<Component />} key={path + "--without-layout "} />
              )
            )
          : PUBLIC_ROUTES.map(({ component: Component, to: path }) => (
              <Route path={path} element={<Component />} key={path} />
            ))}

        <Route path="*" element={<Navigate to={ROUTES_ENDPOINTS.DASHBOARD} />} />
      </Routes>
    </Router>
  )
}

export default App
