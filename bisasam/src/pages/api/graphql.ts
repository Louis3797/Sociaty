import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server-micro";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    allUsers: [User!]!
    findUser(id: Int!): User!
    findUserWithEmail(email: String!): User!
  }
  type User {
    id: Int!
    name: String!
    image: String!
    email: String
    bio: String
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
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
