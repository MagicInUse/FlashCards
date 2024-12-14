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
  mutation AddCard($question: String!, $answer: String!) {
    addCard(question: $question, answer: $answer) {
      id
      front
      back
    }
  }
`;