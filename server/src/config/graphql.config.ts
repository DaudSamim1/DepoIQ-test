import { ApolloServer } from "apollo-server-express"
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node"
import { AuthenticatedRequest } from "../types"
import { typeDefs } from "../graphql/schema"
import { resolvers } from "../graphql/resolvers"

const createGraphQLServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: async ({ req, res }: any) => {
      let auth: any
      await ClerkExpressWithAuth()(req, res, (err: any) => {
        if (err) {
          throw new Error("Unauthorized: Please log in to access this resource.")
        }
        auth = (req as AuthenticatedRequest).auth
      })

      if (!auth || !auth.userId) {
        throw new Error("Unauthorized: Please log in to access this resource.")
      }

      return {
        userId: auth.userId,
        sessionId: auth.sessionId
      }
    }
  })
}

export default createGraphQLServer
