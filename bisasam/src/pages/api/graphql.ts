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
    liked: [UserLikedComment]
    content: Content!
    tags: [CommentOnHashtag]
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
    getSingleContent(content_id: String!, userId: String!): Content!
  }

  type Mutation {
    postContent(content_text: String, userId: ID!, gif_url: String): Content
    createContentLike(userId: String!, contentId: String!): UserLikedContent!
    deleteContentLike(userId: String!, contentId: String!): UserLikedContent
    postComment(
      userId: String!
      contentId: String!
      comment_text: String!
    ): Comment!
    updateProfile(
      userId: String!
      displayName: String
      bio: String
      bannerUrl: String
    ): String
    deletePost(userId: String!, contentId: String!): String!
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

    // getSingleContent: (_parent, _args, ctx) => {
    //   return prisma.content.findFirst({
    //     where: {
    //       content_id: _args.content_id,
    //       userId: _args.userId,
    //     },
    //     include: {
    //       liked: true,
    //       comments: true,
    //       user: true,
    //     },
    //   });
    // },
  },

  Mutation: {
    postContent: async (parent, _args, context) => {
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
    createContentLike: async (_parent, _args, ctx) => {
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
    deleteContentLike: async (_parent, _args, ctx) => {
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
    postComment: async (_parent, _args, ctx) => {
      const [createComment, updatedContent] = await prisma.$transaction([
        prisma.comment.create({
          data: {
            content_id: _args.contentId,
            userId: _args.userId,
            comment_text: _args.comment_text,
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

    updateProfile: async (_parent, _args, ctx) => {
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

    //!! Delete Comment likes or check / test if already deleted
    deletePost: async (_parent, _args, ctx) => {
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
