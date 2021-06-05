import { gql } from "@apollo/client";

export const POST_CONTENT = gql`
  mutation POST_CONTENT($content_text: String!, $user_id: Int!) {
    postContent(content_text: $content_text, user_id: $user_id) {
      content_text
      user_id
    }
  }
`;
