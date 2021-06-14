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
      following {
        user {
          id
          name
        }
      }
      followedBy {
        user {
          id
          name
        }
      }
      content {
        content_id
        content_text
        userId
        image_id
        created_at
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
          userId
        }
      }
    }
  }
`;

export const GET_CONTENT = gql`
  query GET_CONTENT($userId: Int!, $content_id: Int!) {
    getContent(userId: $userId, content_id: $content_id) {
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
`;
