import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { ApolloError } from "apollo-server-micro";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GET_USER_CONTENT } from "../../../graphql/querys";
import ContentEmptyState from "../content/ContentEmptyState";
import ListContent from "../content/ListContent";

export interface Hashtags {
  id?: string;
  text: string;
}

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
  tags?: Hashtags;
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

export interface ProfileContentProps {}

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full bg-transparent items-center justify-start mt-10">
      <CircularProgress />
    </div>
  );
};

const ProfileContent: React.FC<ProfileContentProps> = () => {
  const router = useRouter();

  const { name } = router.query;
  const [userContent, setuserContent] = useState(null);

  const { loading, error, data } = useQuery<QueryProps>(GET_USER_CONTENT, {
    variables: {
      displayName: name,
      currentUserId: window.sessionStorage.getItem("UID"),
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    setuserContent(data?.getUserContent);
  }, [data]);

  const content = userContent?.content.map((content) => {
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
  });
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
