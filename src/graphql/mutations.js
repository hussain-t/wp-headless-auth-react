import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser(
    $username: String!
    $password: String!
    $clientMutationId: String!
  ) {
    login(
      input: {
        clientMutationId: $clientMutationId
        username: $username
        password: $password
      }
    ) {
      authToken
      user {
        id
        userId
        name
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        id
        name
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`;
