import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const httpLink = new HttpLink({
  uri: `${process.env.HTTP_PROTOCOL}${process.env.SERVER_DOMAIN}/graphql`,
  credentials: "include",
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
