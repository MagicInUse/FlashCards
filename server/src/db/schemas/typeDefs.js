import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Card {
    id: Int!
    question: String!
    answer: String!
  }

  type User {
    id: ID!
    username: String!
    authLevel: Int!
  }

  type Query {
    cards: [Card]
    card(id: Int!): Card
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addCard(question: String!, answer: String!): Card
    registerUser(username: String!, password: String!, authLevel: Int!): User
  }
`;

export default typeDefs;