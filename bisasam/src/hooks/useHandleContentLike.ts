import { OperationVariables, useMutation } from "@apollo/client";
import { CREATE_LIKE, DELETE_LIKE } from "../graphql/mutations";

export const useHandleContentLike = () => {
  const [deleteLike] = useMutation<any, OperationVariables>(DELETE_LIKE);
  const [createLike] = useMutation<any, OperationVariables>(CREATE_LIKE);

  function likeHandler(
    isLiked: boolean,
    userId: string,
    contentId: string
  ): void {
    if (isLiked) {
      deleteLike({
        variables: {
          userId: userId,
          contentId: contentId,
        },
      });
    } else {
      createLike({
        variables: {
          userId: userId,
          contentId: contentId,
        },
      });
    }
  }

  return [likeHandler] as const;
};
