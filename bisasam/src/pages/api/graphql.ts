import prisma from "../../lib/prismaClient";
import { ApolloServer, gql } from "apollo-server-micro";
// @ts-ignore
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import {
  Content,
  Comment,
  Hashtag,
  Prisma,
  User,
  User_liked_content,
  UserFollows,
  PrismaPromise,
  User_liked_comment,
} from "@prisma/client";
import { GraphQLScalarType } from "graphql";

const typeDefs = gql`
  scalar GraphQLDateTime
  scalar Void

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
    subscribed: String!
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
    getUserData(displayName: String!, currentUserId: String!): User
    getUserContent(displayName: String!, currentUserId: String!): User!
    getSingleUserContent(
      userId: String!
      contentId: String!
      currentUserId: String!
    ): Content
    getCommentsOfContent(contentId: String!, currentUserId: String!): [Comment]
    getContentLikeStatus(contentId: String!, currentUserId: String!): Content!
    checkForAvailableUsername(displayName: String!): Int!
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
    handleSubscription(
      userId: String!
      currentUserId: String!
      currentStatus: Boolean!
    ): String!
  }
`;

const voidScalar = new GraphQLScalarType({
  name: "Void",

  description: "Represents NULL values",

  serialize() {
    return null;
  },

  parseValue() {
    return null;
  },

  parseLiteral() {
    return null;
  },
});

const resolvers = {
  Void: voidScalar,
  Content: {
    favourite: async (
      parent: { id: string },
      _args: any,
      context: any,
      info: { variableValues: { currentUserId: string } }
    ) => {
      const data: User_liked_content | null =
        await prisma.user_liked_content.findUnique({
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
    favourite: async (
      parent: { id: string },
      _args: any,
      context: any,
      info: { variableValues: { currentUserId: string } }
    ) => {
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
  User: {
    subscribed: async (
      parent: { id: string },
      _args: any,
      context: any,
      info: { variableValues: { currentUserId: string } }
    ): Promise<string> => {
      if (parent.id === info.variableValues.currentUserId) {
        return "isCurrentUser";
      } else {
        const data = await prisma.userFollows.findUnique({
          where: {
            followerId_followingId: {
              followerId: info.variableValues.currentUserId,
              followingId: parent.id,
            },
          },
        });
        if (data === null) {
          return "false";
        } else {
          return "true";
        }
      }
    },
  },
  Query: {
    getUserData: async (
      parent: any,
      _args: { displayName: string },
      context: any,
      info: any
    ): Promise<User | null> => {
      return await prisma.user.findFirst({
        where: {
          displayName: _args.displayName,
        },
      });
    },

    getUserContent: async (
      parent: any,
      _args: { displayName: string },
      context: any,
      info: any
    ): Promise<
      | (User & {
          content: Content[];
        })
      | null
    > => {
      return await prisma.user.findFirst({
        where: {
          displayName: _args.displayName,
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
    getSingleUserContent: async (
      parent: any,
      _args: { contentId: string },
      context: any,
      info: any
    ): Promise<
      | (Content & {
          user: User;
        })
      | null
    > => {
      return await prisma.content.findUnique({
        where: {
          id: _args.contentId,
        },
        include: {
          user: true,
        },
      });
    },
    getCommentsOfContent: async (
      parent: any,
      _args: { contentId: string },
      context: any,
      info: any
    ): Promise<
      | (Comment & {
          user: User;
        })[]
      | null
    > => {
      return await prisma.comment.findMany({
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
    getContentLikeStatus: async (
      parent: any,
      _args: { contentId: string },
      context: any,
      info: any
    ): Promise<Content | null> => {
      return await prisma.content.findUnique({
        where: {
          id: _args.contentId,
        },
      });
    },
    checkForAvailableUsername: async (
      parent: any,
      _args: { displayName: string },
      context: any,
      info: any
    ): Promise<number> => {
      return await prisma.user.count({
        where: {
          displayName: _args.displayName,
        },
      });
    },
  },

  Mutation: {
    postContent: async (
      parent: any,
      _args: {
        content_text: string;
        userId: string;
        gif_url: string;
      },
      context: any,
      info: any
    ): Promise<Content> => {
      const [createPost, updatedContributions] = await prisma.$transaction<
        [Prisma.Prisma__ContentClient<Content>, Prisma.Prisma__UserClient<User>]
      >([
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

      // Split Text in Words an safe in Array
      let temp: string[] = _args.content_text.split(" ");

      // Check if item is an Hashtag
      function isHashtag(text: string): boolean {
        if (
          text.substr(0, 1) === "#" &&
          text.length > 1 &&
          text.slice(1).includes("#") === false
        ) {
          return true;
        }
        return false;
      }

      // Check if item exists
      async function checkForExistence(text: string): Promise<boolean> {
        let temp: Hashtag | null = await prisma.hashtag.findUnique({
          where: {
            text: text,
          },
        });
        return temp === null ? false : true;
      }

      temp.forEach(async (item) => {
        if (isHashtag(item)) {
          if ((await checkForExistence(item)) === false) {
            await prisma.hashtag.create({
              data: {
                text: item,
              },
            });
          }
          await prisma.contentOnHashtag.create({
            data: {
              hashtagText: item,
              contentId: createPost?.id,
            },
          });
        }
      });

      return createPost;
    },
    createContentLike: async (
      parent: any,
      _args: { userId: string; contentId: string },
      context: any,
      info: any
    ): Promise<User_liked_content> => {
      const [createLike, updatedContent] = await prisma.$transaction<
        [
          Prisma.Prisma__User_liked_contentClient<User_liked_content>,
          Prisma.Prisma__ContentClient<Content>
        ]
      >([
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
    deleteContentLike: async (
      parent: any,
      _args: { userId: string; contentId: string },
      context: any,
      info: any
    ): Promise<Prisma.BatchPayload> => {
      const [deleteLike, updatedContent] = await prisma.$transaction<
        [
          PrismaPromise<Prisma.BatchPayload>,
          Prisma.Prisma__ContentClient<Content>
        ]
      >([
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
    postComment: async (
      parent: any,
      _args: {
        contentId: string;
        userId: string;
        comment_text: string;
        gif_url: string;
      },
      context: any,
      info: any
    ) => {
      // Create Comment and update the number of Comments of the Content
      const [createComment, updatedContent] = await prisma.$transaction<
        [
          Prisma.Prisma__CommentClient<Comment>,
          Prisma.Prisma__ContentClient<Content>
        ]
      >([
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

      // Split Text in Words an safe in Array
      let temp: string[] = _args.comment_text.split(" ");

      // Check if item is an Hashtag
      function isHashtag(text: string): boolean {
        if (
          text.substr(0, 1) === "#" &&
          text.length > 1 &&
          text.slice(1).includes("#") === false
        ) {
          return true;
        }
        return false;
      }

      // Check if item exists
      async function checkForExistence(text: string): Promise<boolean> {
        let temp: Hashtag | null = await prisma.hashtag.findUnique({
          where: {
            text: text,
          },
        });
        return temp === null ? false : true;
      }

      temp.forEach(async (item) => {
        if (isHashtag(item)) {
          if ((await checkForExistence(item)) === false) {
            await prisma.hashtag.create({
              data: {
                text: item,
              },
            });
          }
          await prisma.commentOnHashtag.create({
            data: {
              hashtagText: item,
              commentId: createComment?.id,
            },
          });
        }
      });

      return createComment;
    },

    updateProfile: async (
      parent: any,
      _args: {
        userId: string;
        bio: string;
        displayName: string;
        bannerUrl: string;
      },
      context: any,
      info: any
    ): Promise<string> => {
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

    deletePost: async (
      parent: any,
      _args: { contentId: string; userId: string },
      context: any,
      info: any
    ): Promise<string> => {
      const [deletePost, updateUser] = await prisma.$transaction<
        [Prisma.Prisma__ContentClient<Content>, Prisma.Prisma__UserClient<User>]
      >([
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
    deleteComment: async (
      parent: any,
      _args: { commentId: string; contentId: string },
      context: any,
      info: any
    ): Promise<string> => {
      const [deleteComment, updatePost] = await prisma.$transaction<
        [
          Prisma.Prisma__CommentClient<Comment>,
          Prisma.Prisma__ContentClient<Content>
        ]
      >([
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
    createCommentLike: async (
      parent: any,
      _args: { userId: string; commentId: string },
      context: any,
      info: any
    ): Promise<string> => {
      const [createLike, updatedComment] = await prisma.$transaction<
        [
          Prisma.Prisma__User_liked_commentClient<User_liked_comment>,
          Prisma.Prisma__CommentClient<Comment>
        ]
      >([
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
    deleteCommentLike: async (
      parent: any,
      _args: { userId: string; commentId: string },
      context: any,
      info: any
    ): Promise<string> => {
      const [deleteLike, updatedComment] = await prisma.$transaction<
        [
          PrismaPromise<Prisma.BatchPayload>,
          Prisma.Prisma__CommentClient<Comment>
        ]
      >([
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
    handleSubscription: async (
      parent: any,
      _args: { currentStatus: boolean; currentUserId: string; userId: string },
      context: any,
      info: any
    ): Promise<string> => {
      if (_args.currentStatus) {
        const [handleSub, updateCurrentUser, updateFollowedUser] =
          await prisma.$transaction<
            [
              Prisma.Prisma__UserFollowsClient<UserFollows>,
              Prisma.Prisma__UserClient<User>,
              Prisma.Prisma__UserClient<User>
            ]
          >([
            prisma.userFollows.delete({
              where: {
                followerId_followingId: {
                  followerId: _args.currentUserId,
                  followingId: _args.userId,
                },
              },
            }),
            prisma.user.update({
              where: {
                id: _args.currentUserId,
              },
              data: {
                numFollowing: { decrement: 1 },
              },
            }),
            prisma.user.update({
              where: {
                id: _args.userId,
              },
              data: {
                numFollowers: { decrement: 1 },
              },
            }),
          ]);
        return "Unfollowed";
      } else {
        const [handleSub, updateCurrentUser, updateFollowedUser] =
          await prisma.$transaction<
            [
              Prisma.Prisma__UserFollowsClient<UserFollows>,
              Prisma.Prisma__UserClient<User>,
              Prisma.Prisma__UserClient<User>
            ]
          >([
            prisma.userFollows.create({
              data: {
                followerId: _args.currentUserId,
                followingId: _args.userId,
              },
            }),
            prisma.user.update({
              where: {
                id: _args.currentUserId,
              },
              data: {
                numFollowing: { increment: 1 },
              },
            }),
            prisma.user.update({
              where: {
                id: _args.userId,
              },
              data: {
                numFollowers: { increment: 1 },
              },
            }),
          ]);
        return "Followed";
      }
    },
  },
};

const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  // @ts-ignore
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
