import prisma from "../../lib/prismaClient";
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    allUsers: [User!]!
    findUser(id: Int!): User!
    findUserWithEmail(email: String!): User!
  }

  type Mutation {
    postContent(content_text: String!, userId: Int!, image_id: Int): Content
    deleteContentLike(userId: Int!, content_id: Int!): UserLikedContent
    createContentLike(userId: Int!, content_id: Int!): UserLikedContent
  }
  type User {
    id: Int!
    name: String!
    image: String!
    email: String!
    bio: String
    content: [Content!]
    followedBy: [UserFollowsUser!]
    following: [UserFollowsUser!]
    liked_content: [UserLikedContent!]
    liked_comments: [UserLikedComment!]
    blockedBy: [User]
    blocked: [User]
  }
  type UserFollowsUser {
    userA: User!
    userB: User!
  }

  type Content {
    content_id: Int!
    content_text: String!
    userId: Int!
    image_id: Int
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
    allUsers: () => {
      return prisma.user.findMany();
    },

    findUser: (_parent, _args, ctx) => {
      return prisma.user.findUnique({
        where: {
          id: _args.id,
        },
        include: {
          liked_content: {
            where: {
              userId: _args.id,
            },
          },
          content: {
            include: {
              liked: {
                where: {
                  userId: _args.id,
                },
              },
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
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
