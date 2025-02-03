import { createRoot } from "react-dom/client"
import "./styles/global.css"
import App from "./App.tsx"
import { ClerkProvider } from "@clerk/clerk-react"
import { ApolloProviderWrapper } from "./apollo/ApolloProviderWrapper.tsx"
import ErrorBoundary from "./components/ErrorBoundary.tsx"
import { ROUTES_ENDPOINTS } from "./contants/routes_endpoints.ts"
import { SearchProvider } from "./hook/useSearch.tsx"
import { Suspense } from "react"
import SpinLoader from "./components/SpinLoader.tsx"

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl={ROUTES_ENDPOINTS.DASHBOARD}>
      <ApolloProviderWrapper>
        <SearchProvider>
          <Suspense fallback={<SpinLoader />}>
            <App />
          </Suspense>
        </SearchProvider>
      </ApolloProviderWrapper>
    </ClerkProvider>
  </ErrorBoundary>
)
