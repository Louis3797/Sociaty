import { gql } from "@apollo/client";

export const POST_CONTENT = gql`
  mutation POST_CONTENT($content_text: String!, $userId: Int!) {
    postContent(content_text: $content_text, userId: $userId) {
      content_text
      userId
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation DELETE_LIKE($userId: Int!, $content_id: Int!) {
    deleteContentLike(userId: $userId, content_id: $content_id) {
      userId
      content_id
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation CREATE_LIKE($userId: Int!, $content_id: Int!) {
    createContentLike(userId: $userId, content_id: $content_id) {
      userId
      content_id
    }
  }
`;
