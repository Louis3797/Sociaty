import React from "react";
import { ApolloError, useQuery } from "@apollo/client";
import { GET_COMMENTS_OF_CONTENT } from "../../../../graphql/querys";
import Comment from "../../../modules/comment/Comment";
import CommentEmptyState from "../../../modules/comment/CommentEmptyState";
import { CircularProgress } from "@material-ui/core";

interface QueryProps {
  getCommentsOfContent: any;
  loading: boolean;
  error: ApolloError;
}

export interface CommentsBoxProps {
  contentId: string;
}

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full bg-transparent items-center justify-start mt-10">
      <CircularProgress />
    </div>
  );
};

const CommentsBox: React.FC<CommentsBoxProps> = ({ contentId }) => {
  const { loading, error, data } = useQuery<QueryProps>(
    GET_COMMENTS_OF_CONTENT,
    {
      variables: {
        contentId: contentId,
        currentUserId: window.sessionStorage.getItem("UID"),
      },
    }
  );
  const comments = data?.getCommentsOfContent.map((comment, i) => {
    return (
      <Comment
        key={i}
        id={comment.id}
        contentId={contentId}
        comment_text={comment.comment_text}
        userId={comment.userId}
        created_at={comment.created_at}
        numLikes={comment.numLikes}
        liked={comment.favourite}
        gif_url={comment.gif_url}
        name={comment.user.name}
        displayName={comment.user.displayName}
        userImg={comment.user.image}
      />
    );
  });
  return (
    <div className="flex flex-col w-full h-full bg-transparent items-center justify-start mt-2">
      {error ? (
        <h1>Error</h1>
      ) : loading ? (
        <LoadingState />
      ) : data?.getCommentsOfContent?.length === 0 ? (
        <CommentEmptyState />
      ) : (
        comments
      )}
    </div>
  );
};

export default CommentsBox;
