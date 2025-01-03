import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    user {
      id
      username
      email
      createdAt
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