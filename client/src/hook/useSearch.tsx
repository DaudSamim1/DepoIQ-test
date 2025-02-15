import React, { createContext, useContext, useState, ReactNode } from "react"

// Create Context
interface SearchContextType {
  searchValue: string
  setSearchValue: (value: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Search Provider Component
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchValue, setSearchValue] = useState("")

  return <SearchContext.Provider value={{ searchValue, setSearchValue }}>{children}</SearchContext.Provider>
}

// Custom Hook to use search state
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
