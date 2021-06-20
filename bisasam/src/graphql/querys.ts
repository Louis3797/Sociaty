import { gql } from "@apollo/client";

export const GET_USER_ID = gql`
  query GET_USER_ID($email: String!) {
    getUserID(email: $email) {
      id
      name
    }
  }
`;

export const GET_USER = gql`
  query GET_USER($id: String!) {
    findUser(id: $id) {
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
      content {
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
            text
          }
        }
        user {
          id
          displayName
          name
          image
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
      created_at
      user {
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
        created_at
      }
    }
  }
`;
