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
//For Posts
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
    $comment_text: String
    $gif_url: String
  ) {
    postComment(
      userId: $userId
      contentId: $contentId
      comment_text: $comment_text
      gif_url: $gif_url
    ) {
      id
      userId
      content_id
      comment_text
      gif_url
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

export const DELETE_POST = gql`
  mutation DELETE_POST($userId: String!, $contentId: String!) {
    deletePost(userId: $userId, contentId: $contentId)
  }
`;

export const DELETE_COMMENT = gql`
  mutation DELETE_COMMENT($contentId: String!, $commentId: String!) {
    deleteComment(contentId: $contentId, commentId: $commentId)
  }
`;

export const DELETE_COMMENT_LIKE = gql`
  mutation DELETE_LIKE($userId: String!, $commentId: String!) {
    deleteCommentLike(userId: $userId, commentId: $commentId)
  }
`;

export const CREATE_COMMENT_LIKE = gql`
  mutation CREATE_LIKE($userId: String!, $commentId: String!) {
    createCommentLike(userId: $userId, commentId: $commentId)
  }
`;
