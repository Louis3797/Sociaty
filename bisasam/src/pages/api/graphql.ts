import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server-micro";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    allUsers: [User!]!
    findUser(id: Int!): User!
    findUserWithEmail(email: String!): User!
    getContentFromUser(id: Int!): [Content!]
  }

  type Mutation {
    postContent(content_text: String!, user_id: Int!, image_id: Int): Content
  }
  type User {
    id: Int!
    name: String!
    image: String!
    email: String
    bio: String
    content: [Content!]!
    follow: [UserFollowsUser!]!
  }
  type UserFollowsUser {
    userA: User!
    userB: User!
  }

  type Content {
    content_id: Int!
    content_text: String!
    user_id: Int!
    image_id: Int
    createdAt: DateTime
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
          user_id: _args.user_id,
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
