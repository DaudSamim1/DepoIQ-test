import React from "react"
import { Link } from "react-router-dom"
import { ROUTES_ENDPOINTS } from "../../contants/routes_endpoints"

const Logo: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  return (
    <>
      <Link to={ROUTES_ENDPOINTS.DASHBOARD} className="flex items-center space-x-3 py-3">
        <span className="text-lg font-bold text-white hover:text-blue-400 ">{isCollapsed ? "D" : "DepoIQ"}</span>
      </Link>
    </>
  )
}

export default Logo
