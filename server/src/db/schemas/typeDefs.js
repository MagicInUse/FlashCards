import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Card {
    id: Int!
    front: String!
    back: String!
    cardClass: String!
    cardCreatorId: ID!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    authLevel: Int
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    cards: [Card]
    card(id: Int!): Card
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addCard(question: String!, answer: String!, cardClass: String!): Card
    updateCard(id: Int!, front: String, back: String, cardClass: String): Card
    registerUser(username: String!, password: String!, authLevel: Int!): User
    loginUser(username: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;