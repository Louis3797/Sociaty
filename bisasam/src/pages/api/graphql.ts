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
  }
  type User {
    id: Int!
    name: String!
    image: String!
    email: String
    bio: String
    content: [Content!]!
    follow: [UserFollowsUser!]!
    likedContent: [UserLikedContent!]
    likedComments: [UserLikedComment!]
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
  }

  type Comment {
    comment_id: Int!
    content_id: Int!
    comment_text: String!
    userId: Int!
  }

  type UserLikedContent {
    userId: Int!
    content_id: Int!
  }

  type UserLikedComment {
    userId: Int!
    comment_id: Int!
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
          content: {
            include: {
              liked: true,
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
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
