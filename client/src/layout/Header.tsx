import React, { useState, useEffect } from "react"
import { SignedIn, UserButton } from "@clerk/clerk-react"
import { Input } from "antd"
import { useLocation } from "react-router-dom"
import { ROUTES_ENDPOINTS } from "../contants/routes_endpoints"
import { useSearch } from "../hook/useSearch"

const Header: React.FC = () => {
  const { searchValue, setSearchValue } = useSearch()
  const { pathname } = useLocation()
  const isTagPage = pathname === ROUTES_ENDPOINTS.TAGS
  const isTopicPage = pathname === ROUTES_ENDPOINTS.DASHBOARD
  const [isMobile, setIsMobile] = useState(false)

  // Local state for debouncing
  const [debouncedValue, setDebouncedValue] = useState(searchValue)

  // Effect to debounce search input (300ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchValue(debouncedValue)
    }, 100)

    return () => clearTimeout(handler)
  }, [debouncedValue, setSearchValue])

  // Reset search value on page change
  useEffect(() => {
    if (!!debouncedValue) setDebouncedValue("")
  }, [pathname])

  //  if window resizing width is less than 550px then isMobile state is true
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 550) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    handleResize() // initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex items-center justify-between p-6 bg-gray-100 dark:bg-gray-800 shadow">
      <div className="flex items-center space-x-4 justify-between w-full">
        <div className="flex items-center space-x-4">
          <Input
            size={"middle"}
            placeholder={isTagPage ? "Search tags" : isTopicPage ? "Search topics" : "Search"}
            allowClear
            onChange={(e) => setDebouncedValue(e.target.value)}
            className="w-64"
            value={debouncedValue}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <SignedIn>
            <UserButton showName={!isMobile} />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default Header
