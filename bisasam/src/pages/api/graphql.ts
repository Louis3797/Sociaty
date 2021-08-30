import prisma from "../../lib/prismaClient";
import { ApolloServer, gql } from "apollo-server-micro";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { useCurrentUser } from "../../globals-stores/useCurrentUser";
import { getCsrfToken, getSession } from "next-auth/client";

const typeDefs = gql`
  scalar GraphQLDateTime

  type Content {
    id: ID!
    content_text: String!
    created_at: GraphQLDateTime!
    userId: ID!
    image_id: ID
    numLikes: Int!
    numComments: Int!
    comments: [Comment]
    liked: [UserLikedContent]
    user: User!
    image: Image
    gif_url: String
    tags: [ContentOnHashtag]
    favourite: Boolean
  }

  type Group {
    id: ID!
    group_name: String!
    description: String!
    admin_id: ID!
    messages: [Message]
    members: [UserInGroup]
  }

  type Image {
    id: ID!
    url: String!
    content: Content
    message: Message
  }

  type Message {
    id: ID!
    created_at: GraphQLDateTime!
    text_message: String
    userId: ID!
    group_id: ID!
    gif_url: String
    user: User!
    group: Group!
    image: Image
  }

  type Comment {
    id: ID!
    content_id: ID!
    comment_text: String!
    created_at: GraphQLDateTime!
    userId: ID!
    numLikes: Int!
    gif_url: String
    user: User!
    liked: [UserLikedComment]
    content: Content!
    tags: [CommentOnHashtag]
    favourite: Boolean
  }

  type UserInGroup {
    userId: ID
    user: User
    group_id: ID
    group: Group
  }

  type UserLikedComment {
    userId: ID
    user: User
    comment_id: ID
    comment: Comment
  }

  type UserLikedContent {
    userId: ID
    user: User
    content_id: ID
    content: Content
  }

  type User {
    id: ID!
    name: String!
    displayName: String!
    email: String!
    created_at: GraphQLDateTime!
    image: String!
    bannerUrl: String
    bio: String
    numFollowing: Int!
    numFollowers: Int!
    online: Boolean
    numContributions: Int!
    content: [Content]
    comments: [Comment]
    messages: [Message]
    inGroup: [UserInGroup]
    followers: [User]
    following: [User]
    liked_content: [UserLikedContent]
    liked_comments: [UserLikedComment]
    blockedBy: [User]
    blocked: [User]
  }

  type Hashtag {
    id: ID!
    text: String!
    comments: [CommentOnHashtag]
    content: [ContentOnHashtag]
  }

  type CommentOnHashtag {
    hashtagId: ID
    hashtag: Hashtag
    commentId: ID
    comment: Comment
  }

  type ContentOnHashtag {
    hashtagId: ID
    hashtag: Hashtag
    contentId: ID
    content: Content
  }

  type Query {
    getUserID(email: String!): User!
    getUserData(id: String!): User!
    getUserContent(userId: String!, currentUserId: String!): User!
    getSingleUserContent(userId: String!, contentId: String!): Content
    getCommentsOfContent(contentId: String!, currentUserId: String!): [Comment]
    getContentLikeStatus(contentId: String!, currentUserId: String!): Content!
  }

  type Mutation {
    postContent(content_text: String, userId: ID!, gif_url: String): Content
    createContentLike(userId: String!, contentId: String!): UserLikedContent!
    deleteContentLike(userId: String!, contentId: String!): UserLikedContent
    postComment(
      userId: String!
      contentId: String!
      comment_text: String
      gif_url: String
    ): Comment!
    updateProfile(
      userId: String!
      displayName: String
      bio: String
      bannerUrl: String
    ): String
    deletePost(userId: String!, contentId: String!): String!
    deleteComment(contentId: String!, commentId: String!): String!
    createCommentLike(userId: String!, commentId: String!): String!
    deleteCommentLike(userId: String!, commentId: String!): String!
  }
`;

const resolvers = {
  Content: {
    favourite: async (parent, _args, context, info) => {
      const data = await prisma.user_liked_content.findUnique({
        where: {
          userId_content_id: {
            userId: info.variableValues.currentUserId,
            content_id: parent.id,
          },
        },
      });

      if (data === null) {
        return false;
      } else {
        return true;
      }
    },
  },
  Comment: {
    favourite: async (parent, _args, context, info) => {
      const data = await prisma.user_liked_comment.findUnique({
        where: {
          userId_comment_id: {
            userId: info.variableValues.currentUserId,
            comment_id: parent.id,
          },
        },
      });

      if (data === null) {
        return false;
      } else {
        return true;
      }
    },
  },
  Query: {
    getUserID: (parent, _args, context, info) => {
      return prisma.user.findUnique({
        where: {
          email: _args.email,
        },
      });
    },
    getUserData: (parent, _args, context, info) => {
      return prisma.user.findUnique({
        where: {
          id: _args.id,
        },
      });
    },

    getUserContent: (parent, _args, context, info) => {
      return prisma.user.findUnique({
        where: {
          id: _args.userId,
        },
        include: {
          content: {
            orderBy: {
              created_at: "desc",
            },
          },
        },
      });
    },
    getSingleUserContent: (parent, _args, context, info) => {
      return prisma.content.findUnique({
        where: {
          id: _args.contentId,
        },
        include: {
          user: true,
        },
      });
    },
    getCommentsOfContent: (parent, _args, context, info) => {
      return prisma.comment.findMany({
        where: {
          content_id: _args.contentId,
        },
        include: {
          user: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    },
    getContentLikeStatus: (parent, _args, context, info) => {
      console.log(parent);
      return prisma.content.findUnique({
        where: {
          id: _args.contentId,
        },
      });
    },
  },

  Mutation: {
    postContent: async (parent, _args, context, info) => {
      const [createPost, updatedContributions] = await prisma.$transaction([
        prisma.content.create({
          data: {
            content_text: _args.content_text,
            userId: _args.userId,
            gif_url: _args.gif_url,
          },
        }),

        prisma.user.update({
          where: { id: _args.userId },
          data: {
            numContributions: {
              increment: 1,
            },
          },
        }),
      ]);

      return createPost;
    },
    createContentLike: async (parent, _args, context, info) => {
      const [createLike, updatedContent] = await prisma.$transaction([
        prisma.user_liked_content.create({
          data: {
            userId: _args.userId,
            content_id: _args.contentId,
          },
        }),
        prisma.content.update({
          where: { id: _args.contentId },
          data: {
            numLikes: {
              increment: 1,
            },
          },
        }),
      ]);
      return createLike;
    },
    deleteContentLike: async (parent, _args, context, info) => {
      const [deleteLike, updatedContent] = await prisma.$transaction([
        prisma.user_liked_content.deleteMany({
          where: {
            userId: _args.userId,
            content_id: _args.contentId,
          },
        }),
        prisma.content.update({
          where: { id: _args.contentId },
          data: {
            numLikes: {
              decrement: 1,
            },
          },
        }),
      ]);
      return deleteLike;
    },
    postComment: async (parent, _args, context, info) => {
      const [createComment, updatedContent] = await prisma.$transaction([
        prisma.comment.create({
          data: {
            content_id: _args.contentId,
            userId: _args.userId,
            comment_text: _args.comment_text,
            gif_url: _args.gif_url,
          },
        }),
        prisma.content.update({
          where: { id: _args.contentId },
          data: {
            numComments: {
              increment: 1,
            },
          },
        }),
      ]);
      return createComment;
    },

    updateProfile: async (parent, _args, context, info) => {
      await prisma.user.update({
        where: { id: _args.userId },
        data: {
          bio: _args.bio,
          displayName: _args.displayName,
          bannerUrl: _args.bannerUrl,
        },
      });
      return "Ok";
    },

    deletePost: async (parent, _args, context, info) => {
      const [deletePost, updateUser] = await prisma.$transaction([
        prisma.content.delete({
          where: { id: _args.contentId },
        }),
        prisma.user.update({
          where: { id: _args.userId },
          data: {
            numContributions: { decrement: 1 },
          },
        }),
      ]);

      return "Ok";
    },
    deleteComment: async (parent, _args, context, info) => {
      const [deleteComment, updatePost] = await prisma.$transaction([
        prisma.comment.delete({
          where: { id: _args.commentId },
        }),
        prisma.content.update({
          where: { id: _args.contentId },
          data: {
            numComments: { decrement: 1 },
          },
        }),
      ]);

      return "Ok";
    },
    createCommentLike: async (parent, _args, context, info) => {
      const [createLike, updatedComment] = await prisma.$transaction([
        prisma.user_liked_comment.create({
          data: {
            userId: _args.userId,
            comment_id: _args.commentId,
          },
        }),
        prisma.comment.update({
          where: { id: _args.commentId },
          data: {
            numLikes: {
              increment: 1,
            },
          },
        }),
      ]);
      return "Ok";
    },
    deleteCommentLike: async (parent, _args, context, info) => {
      const [deleteLike, updatedComment] = await prisma.$transaction([
        prisma.user_liked_comment.deleteMany({
          where: {
            userId: _args.userId,
            comment_id: _args.commentId,
          },
        }),
        prisma.comment.update({
          where: { id: _args.commentId },
          data: {
            numLikes: {
              decrement: 1,
            },
          },
        }),
      ]);
      return "Ok";
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
