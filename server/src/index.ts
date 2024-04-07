import { ApolloServer } from "@apollo/server"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { expressMiddleware } from "@apollo/server/express4"
import dotenv from "dotenv"
import express from "express"
import http from "http"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import { PubSub } from "graphql-subscriptions"
import { getSession } from "next-auth/react"

import typeDefs from "./graphql/typeDefs"
import resolvers from "./graphql/resolvers"
import { GraphQLContext, Session } from "./utils/types"

async function main() {
  dotenv.config()
  const app = express()
  const httpServer = http.createServer(app)

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  // Ensure we wait for our server to start
  await server.start()

  /**
   * Context parameters
   */
  const prisma = new PrismaClient()
  const pubsub = new PubSub()

  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const session = await getSession({ req })

        return { session: session as Session, prisma, pubsub }
      },
    })
  )

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`)
}

main().catch((err) => console.log(err))
