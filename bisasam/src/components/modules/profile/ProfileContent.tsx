// @ts-nocheck
import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { ApolloError } from "apollo-server-micro";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GET_USER_CONTENT } from "../../../graphql/querys";
import ContentEmptyState from "../content/ContentEmptyState";
import ListContent from "../content/ListContent";

export interface Content {
  id: string;
  content_text: string;
  userId: string;
  image_id?: string | null;
  created_at: Date;
  numLikes: number;
  numComments: number;
  gif_url: string;
  favourite?: boolean;
  __typename: string;
}

export interface GetUserContent {
  id: string;
  name: string;
  displayName: string;
  image: string;
  content: Content[];
  __typename: string;
}

export interface RootObject {
  getUserContent: GetUserContent;
}

interface QueryProps {
  getUserContent: RootObject;
  loading: boolean;
  error: ApolloError;
}

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full bg-transparent items-center justify-start mt-10">
      <CircularProgress />
    </div>
  );
};

export interface ProfileContentProps {}

const ProfileContent: React.FC<ProfileContentProps> = () => {
  const router = useRouter();

  const { name } = router.query;

  const { loading, error, data } = useQuery<QueryProps>(GET_USER_CONTENT, {
    variables: {
      displayName: name,
      currentUserId: window.sessionStorage.getItem("UID"),
    },
  });
  const [userContent, setuserContent] = useState(data?.getUserContent);

  useEffect(() => {
    setuserContent(data?.getUserContent);
    return userContent;
  }, [data, userContent]);

  const content = userContent?.content.map(
    (content: {
      id: React.Key | null | undefined;
      content_text: string | undefined;
      numLikes: number;
      numComments: number;
      favourite: boolean;
      created_at: string;
      gif_url: string | undefined;
    }) => {
      return (
        <ListContent
          key={content.id}
          userId={userContent?.id}
          contentId={content.id}
          displayName={userContent?.displayName}
          name={userContent?.name}
          userImg={userContent?.image}
          text={content.content_text}
          likeAmount={content.numLikes}
          commentAmount={content.numComments}
          liked={content.favourite}
          createdAt={content.created_at}
          gifUrl={content.gif_url}
        />
      );
    }
  );
  return (
    <div className="flex flex-col w-full h-full bg-transparent items-center justify-start mt-5">
      {error ? (
        <h1>Error</h1>
      ) : loading ? (
        <LoadingState />
      ) : userContent?.content?.length === 0 ? (
        <ContentEmptyState />
      ) : (
        content
      )}
    </div>
  );
};

export default ProfileContent;
