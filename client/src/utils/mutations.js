import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!, $authLevel: Int!) {
    registerUser(username: $username, password: $password, authLevel: $authLevel) {
      id
    }
  }
`;

export const ADD_CARD = gql`
  mutation AddCard($front: String!, $back: String!, $cardClass: String!, $cardCreatorId: ID!) {
    addCard(front: $front, back: $back, cardClass: $cardClass, cardCreatorId: $cardCreatorId) {
      id
      front
      back
      cardClass
      cardCreatorId
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: Int!, $front: String!, $back: String!, $cardClass: String!, $cardUpdaterId: ID!) {
    updateCard(id: $id, front: $front, back: $back, cardClass: $cardClass, cardUpdaterId: $cardUpdaterId) {
      id
      front
      back
      cardClass
      cardCreatorId
      cardUpdaterId
      updatedAt
    }
  }
`;