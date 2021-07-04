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
  mutation DELETE_LIKE($userId: String!, $contentId: String!) {
    deleteContentLike(userId: $userId, contentId: $contentId) {
      userId
      content_id
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation CREATE_LIKE($userId: String!, $contentId: String!) {
    createContentLike(userId: $userId, contentId: $contentId) {
      userId
      content_id
    }
  }
`;

export const POST_COMMENT = gql`
  mutation POST_COMMENT(
    $userId: String!
    $contentId: String!
    $comment_text: String!
  ) {
    postComment(
      userId: $userId
      contentId: $contentId
      comment_text: $comment_text
    ) {
      id
      userId
      content_id
      comment_text
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE(
    $userId: String!
    $displayName: String
    $bio: String
    $bannerUrl: String
  ) {
    updateProfile(
      userId: $userId
      displayName: $displayName
      bio: $bio
      bannerUrl: $bannerUrl
    )
  }
`;
