import { OperationVariables, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_LIKE, DELETE_LIKE } from "../graphql/mutations";

// !! Not for usage, in processing...
export const useSetLike = (
  isLiked: boolean,
  userId: string,
  contentId: string
) => {
  const [deleteLike] = useMutation<any, OperationVariables>(DELETE_LIKE);
  const [createLike] = useMutation<any, OperationVariables>(CREATE_LIKE);

  const [like, setLike] = useState<boolean>(() => {
    return isLiked;
  });

  useEffect(() => {
    if (like) {
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
  }, [like]);

  return [like, setLike] as const;
};
