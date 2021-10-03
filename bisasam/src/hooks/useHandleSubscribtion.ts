import { OperationVariables, useMutation } from "@apollo/client";
import { HANDLE_SUB } from "../graphql/mutations";

const useHandleSubscription = (): readonly [
  (currentStatus: boolean, currentUserId: string, userId: string) => void
] => {
  const [handleSub] = useMutation<any, OperationVariables>(HANDLE_SUB);

  function handleSubscription(
    currentStatus: boolean,
    currentUserId: string,
    userId: string
  ) {
    handleSub({
      variables: {
        userId: userId,
        currentUserId: currentUserId,
        currentStatus: currentStatus,
      },
    });
  }

  return [handleSubscription] as const;
};

export default useHandleSubscription;
