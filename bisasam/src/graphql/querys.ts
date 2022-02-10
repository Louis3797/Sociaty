import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GET_USER($displayName: String!, $currentUserId: String!) {
    getUserData(displayName: $displayName, currentUserId: $currentUserId) {
      id
      name
      displayName
      image
      bannerUrl
      bio
      created_at
      numFollowing
      numFollowers
      numContributions
      online
      subscribed
    }
  }
`;

export const GET_USER_CONTENT = gql`
  query GET_USER_CONTENT($displayName: String!, $currentUserId: String!) {
    getUserContent(displayName: $displayName, currentUserId: $currentUserId) {
      id
      name
      displayName
      image
      content {
        id
        content_text
        userId
        image_id
        created_at
        numLikes
        numComments
        gif_url
        favourite
        tags {
          hashtag {
            id
            text
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_CONTENT = gql`
  query GET_SINGLE_CONTENT(
    $userId: String!
    $contentId: String!
    $currentUserId: String!
  ) {
    getSingleUserContent(
      userId: $userId
      contentId: $contentId
      currentUserId: $currentUserId
    ) {
      id
      content_text
      userId
      image_id
      created_at
      numLikes
      numComments
      gif_url
      tags {
        hashtag {
          id
          text
        }
      }
      user {
        name
        displayName
        image
        subscribed
      }
    }
  }
`;

export const GET_COMMENTS_OF_CONTENT = gql`
  query GET_COMMENTS_OF_CONTENT($contentId: String!, $currentUserId: String!) {
    getCommentsOfContent(contentId: $contentId, currentUserId: $currentUserId) {
      id
      comment_text
      userId
      created_at
      numLikes
      gif_url
      favourite
      user {
        name
        displayName
        image
      }
    }
  }
`;

export const GET_CONTENT_LIKE_STATUS = gql`
  query GET_CONTENT_LIKE_STATUS($contentId: String!, $currentUserId: String!) {
    getContentLikeStatus(contentId: $contentId, currentUserId: $currentUserId) {
      favourite
    }
  }
`;

export const CHECK_FOR_AVAILABLE_USERNAME = gql`
  query CHECK_FOR_AVAILABLE_USERNAME($displayName: String!) {
    checkForAvailableUsername(displayName: $displayName)
  }
`;

export const SEARCH_FOR_USER = gql`
  query SEARCH_FOR_USER($name: String!) {
    searchForUser(name: $name) {
      id
      name
      displayName
      image
      online
    }
  }
`;
