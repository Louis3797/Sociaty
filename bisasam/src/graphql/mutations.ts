import { gql } from "@apollo/client";

export const POST_CONTENT = gql`
  mutation POST_CONTENT($content_text: String!, $userId: Int!) {
    postContent(content_text: $content_text, userId: $userId) {
      content_text
      userId
    }
  }
`;
