import { OperationVariables, useMutation } from "@apollo/client";
import { CREATE_LIKE, DELETE_LIKE } from "../graphql/mutations";

export function useSetLike(isLiked: boolean, userId, contentId): void {
  const [deleteLike] = useMutation<any, OperationVariables>(DELETE_LIKE);
  const [createLike] = useMutation<any, OperationVariables>(CREATE_LIKE);
  if (isLiked) {
    deleteLike({
      variables: {
        userId: userId,
        content_id: contentId,
      },
    });
  } else {
    createLike({
      variables: {
        userId: userId,
        content_id: contentId,
      },
    });
  }
}
