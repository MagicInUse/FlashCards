import { gql } from '@apollo/client';

export const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      front
      back
    }
  }
`;

export const GET_CARD_BY_ID = gql`
  query GetCardById($id: Int!) {
    card(id: $id) {
      id
      front
      back
    }
  }
`;