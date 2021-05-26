import { gql } from "@apollo/client";

export const GET_USER_ID = gql`
  query GET_ID($email: String!) {
    findUserWithEmail(email: $email) {
      id
    }
  }
`;
