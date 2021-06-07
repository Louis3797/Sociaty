import { gql } from "@apollo/client";

export const GET_USER_ID = gql`
  query GET_ID($email: String!) {
    findUserWithEmail(email: $email) {
      id
    }
  }
`;

export const GET_USER_WITH_ID = gql`
  query GET_USER($id: Int!) {
    findUser(id: $id) {
      id
      name
      email
      image
      bio
    }
  }
`;

// ändern
export const GET_ALL_FROM_USER = gql`
  query GET_ALL_USER_DATA($id: Int) {
    getAllDataFromUser(id: $id) {
      id
      name
      email
      image
      bio
    }
  }
`;
