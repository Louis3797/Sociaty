import prisma from "../../lib/prismaClient";
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    findUser(id: Int!): User!
    findUserWithEmail(email: String!): User!
    getContent(content_id: Int!, userId: Int!): Content!
  }

  type Mutation {
    postContent(content_text: String!, userId: Int!, image_id: Int): Content
    deleteContentLike(userId: Int!, content_id: Int!): UserLikedContent
    createContentLike(userId: Int!, content_id: Int!): UserLikedContent
    postComment(content_id: Int!, comment_text: String!, userId: Int!): Comment
  }
  type User {
    id: Int!
    name: String!
    image: String!
    email: String!
    bio: String
    created_at: String!
    content: [Content!]
    followedBy: FollowedBy
    following: Following
    liked_content: [UserLikedContent]
    liked_comments: [UserLikedComment]
    blockedBy: [User]
    blocked: [User]
  }
  type Following {
    user: [User]
  }

  type FollowedBy {
    user: [User]
  }

  type Content {
    content_id: Int!
    content_text: String!
    userId: Int!
    image_id: Int
    created_at: String!
    comments: [Comment]
    liked: [UserLikedContent]
    user: User!
  }

  type Comment {
    comment_id: Int!
    content_id: Int!
    comment_text: String!
    userId: Int!
  }

  type UserLikedContent {
    userId: Int
    content_id: Int
  }

  type UserLikedComment {
    userId: Int
    comment_id: Int
  }
`;

const resolvers = {
  Query: {
    findUser: (_parent, _args, ctx) => {
      return prisma.user.findUnique({
        where: {
          id: _args.id,
        },
        include: {
          followedBy: true,
          following: true,
          liked_content: {
            where: {
              userId: _args.id,
            },
          },
          content: {
            include: {
              liked: true,
              comments: true,
              user: true,
            },
            orderBy: {
              created_at: "desc",
            },
          },
        },
      });
    },

    findUserWithEmail: (_parent, _args, ctx) => {
      return prisma.user.findUnique({
        where: {
          email: _args.email,
        },
      });
    },
    getContent: (_parent, _args, ctx) => {
      return prisma.content.findFirst({
        where: {
          content_id: _args.content_id,
          userId: _args.userId,
        },
        include: {
          liked: true,
          comments: true,
          user: true,
        },
      });
    },
  },

  Mutation: {
    postContent: (_parent, _args, ctx) => {
      return prisma.content.create({
        data: {
          content_text: _args.content_text,
          userId: _args.userId,
        },
      });
    },
    createContentLike: (_parent, _args, ctx) => {
      return prisma.user_liked_content.create({
        data: {
          userId: _args.userId,
          content_id: _args.content_id,
        },
      });
    },
    deleteContentLike: (_parent, _args, ctx) => {
      return prisma.user_liked_content.deleteMany({
        where: {
          userId: _args.userId,
          content_id: _args.content_id,
        },
      });
    },
    postComment: (_parent, _args, ctx) => {
      return prisma.user_comment.create({
        data: {
          content_id: _args.content_id,
          userId: _args.userId,
          comment_text: _args.comment_text,
        },
      });
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
