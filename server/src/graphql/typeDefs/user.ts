import gql from "graphql-tag"

const typeDefs = gql`
  type Query {
    say: String
  }

  type Mutation {
    createUsername(username: String): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`

export default typeDefs
