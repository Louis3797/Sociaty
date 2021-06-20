import { gql } from "@apollo/client";

export const POST_CONTENT = gql`
  mutation POST_CONTENT($content_text: String, $userId: ID!, $gif_url: String) {
    postContent(
      content_text: $content_text
      userId: $userId
      gif_url: $gif_url
    ) {
      id
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

export const POST_COMMENT = gql`
  mutation POST_COMMENT(
    $userId: Int!
    $content_id: Int!
    $comment_text: String!
  ) {
    postComment(
      userId: $userId
      content_id: $content_id
      comment_text: $comment_text
    ) {
      userId
      content_id
      comment_text
    }
  }
`;
