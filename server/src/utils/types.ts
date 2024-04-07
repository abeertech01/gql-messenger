import { ISODateString } from "next-auth"
import { PrismaClient } from "@prisma/client"
import { PubSub } from "graphql-subscriptions"

/**
 * Server Configuration
 */
export interface GraphQLContext {
  session: Session | null
  prisma: PrismaClient
  pubsub: PubSub
}

export interface Session {
  user?: User
  expires: ISODateString
}

export interface CreateUsernameResponse {
  success?: boolean
  error?: string
}

/**
 * Users
 */
export interface User {
  id: string
  username: string
  email: string
  emailVerified: boolean
  image: string
  name: string
}
