import prisma from "../../lib/prismaClient";
import { ApolloServer, gql } from "apollo-server-micro";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

const typeDefs = gql`
  scalar GraphQLDateTime

  type Query {
    getUserID(email: String!): User!
    findUser(id: String!): User!
  }
  # getContent(content_id: String!, userId: String!): Content!
  # type Mutation {
  # }

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
    user: User!
    group: Group!
    image: Image
    type: String!
  }

  type Comment {
    id: ID!
    content_id: ID!
    comment_text: String!
    created_at: GraphQLDateTime!
    userId: ID!
    numLikes: Int!
    liked: [UserLikedComment]
    content: Content!
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
    displayName: String
    email: String!
    created_at: GraphQLDateTime
    image: String!
    bannerUrl: String
    bio: String
    numFollowing: Int
    numFollowers: Int!
    online: Boolean!
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
`;

const resolvers = {
  Query: {
    getUserID: (_parent, _args, ctx) => {
      return prisma.user.findUnique({
        where: {
          email: _args.email,
        },
      });
    },

    findUser: (_parent, _args, ctx) => {
      return prisma.user.findUnique({
        where: {
          id: _args.id,
        },
        include: {
          content: {
            include: {
              user: true,
            },
            orderBy: {
              created_at: "desc",
            },
          },
        },
      });
    },

    // getContent: (_parent, _args, ctx) => {
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

  // Mutation: {
  //     postContent: (_parent, _args, ctx) => {
  //       return prisma.content.create({
  //         data: {
  //           content_text: _args.content_text,
  //           userId: _args.userId,
  //         },
  //       });
  //     },
  //     createContentLike: (_parent, _args, ctx) => {
  //       return prisma.user_liked_content.create({
  //         data: {
  //           userId: _args.userId,
  //           content_id: _args.content_id,
  //         },
  //       });
  //     },
  //     deleteContentLike: (_parent, _args, ctx) => {
  //       return prisma.user_liked_content.deleteMany({
  //         where: {
  //           userId: _args.userId,
  //           content_id: _args.content_id,
  //         },
  //       });
  //     },
  //     postComment: (_parent, _args, ctx) => {
  //       return prisma.user_comment.create({
  //         data: {
  //           content_id: _args.content_id,
  //           userId: _args.userId,
  //           comment_text: _args.comment_text,
  //         },
  //       });
  //     },
  // },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
