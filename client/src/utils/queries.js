import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      authLevel
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      username
      createdAt
      authLevel
    }
  }
`;

export const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      front
      back
      cardClass
    }
  }
`;

export const GET_CARD_BY_ID = gql`
  query GetCardById($id: Int!) {
    card(id: $id) {
      id
      front
      back
      cardClass
      cardCreatorId
      cardUpdaterId
      createdAt
      updatedAt
    }
  }
`;