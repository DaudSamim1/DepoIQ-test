import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { useAuth } from "@clerk/clerk-react"
import { PropsWithChildren, useMemo } from "react"

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL + "/graphql" || ""
})

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const { getToken } = useAuth()

  const client = useMemo(() => {
    const authMiddleware = setContext(async (_, { headers }) => {
      const token = await getToken()

      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      }
    })

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache()
    })
  }, [getToken])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
