import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Card {
    id: Int!
    front: String!
    back: String!
    cardClass: String!
    cardCreatorId: ID!
    cardUpdaterId: ID
    createdAt: String
    updatedAt: String
  }

  type User {
    id: ID!
    username: String!
    password: String!
    createdAt: String!
    authLevel: Int
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    cards: [Card]
    card(id: Int!): Card!
    users: [User]
    user(id: ID!): User!
  }

  type Mutation {
    addCard(front: String!, back: String!, cardClass: String!, cardCreatorId: ID!): Card
    updateCard(id: Int!, front: String!, back: String!, cardClass: String!, cardUpdaterId: ID!): Card
    registerUser(username: String!, password: String!, authLevel: Int!): User
    loginUser(username: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;