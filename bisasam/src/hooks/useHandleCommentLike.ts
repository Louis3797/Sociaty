import { OperationVariables, useMutation } from "@apollo/client";
import { CREATE_COMMENT_LIKE, DELETE_COMMENT_LIKE } from "../graphql/mutations";

export const useHandleCommentLike = (): readonly [
  (isLiked: boolean, userId: string, commentId: string) => void
] => {
  const [deleteLike] = useMutation<any, OperationVariables>(
    DELETE_COMMENT_LIKE
  );
  const [createLike] = useMutation<any, OperationVariables>(
    CREATE_COMMENT_LIKE
  );

  function likeHandler(
    isLiked: boolean,
    userId: string,
    commentId: string
  ): void {
    if (isLiked) {
      deleteLike({
        variables: {
          userId: userId,
          commentId: commentId,
        },
      });
    } else {
      createLike({
        variables: {
          userId: userId,
          commentId: commentId,
        },
      });
    }
  }

  return [likeHandler] as const;
};
