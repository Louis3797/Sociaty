import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server-micro";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    allUsers: [User!]!
    findUser(id: Int): User!
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

    findUser: (userId) => {
      return prisma.user.findUnique({
        where: {
          id: userId,
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
