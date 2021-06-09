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
      content {
        content_id
        content_text
        userId
        image_id
        user {
          id
          name
          image
        }
        liked {
          userId
        }
        comments {
          comment_id
          content_id
          comment_text
          userId
        }
      }
    }
  }
`;
