import React, { useEffect, useState } from "react";
import useHandleSubscription from "../../../hooks/useHandleSubscribtion";
import Button from "../button/Button";
import ButtonLink from "../button/ButtonLink";

interface SubscriptionButtonProps {
  status: string;
  currentUserId: string;
  userId: string;
  className?: string;
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  status,
  currentUserId,
  userId,
  className,
}) => {
  const [sub, setSub] = useState<boolean>(
    status === "true" ? true : status === "false" ? false : false
  );

  const [handleSub] = useHandleSubscription();

  useEffect(() => {
    setSub(status === "true" ? true : status === "false" ? false : false);
    return () => {
      sub;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!sub) {
    return (
      <Button
        text="Follow"
        variant="primary"
        size="big"
        className={className}
        onClick={() => {
          handleSub(sub, currentUserId, userId);
          setSub(!sub);
        }}
      />
    );
  } else {
    return (
      <Button
        text="Unfollow"
        variant="white"
        size="big"
        className={className}
        onClick={() => {
          handleSub(sub, currentUserId, userId);
          setSub(!sub);
        }}
      />
    );
  }
};

export const SubscriptionButtonLink: React.FC<SubscriptionButtonProps> = ({
  status,
  currentUserId,
  userId,
  className,
}) => {
  const [sub, setSub] = useState<boolean>(
    status === "true" ? true : status === "false" ? false : false
  );

  const [handleSub] = useHandleSubscription();

  useEffect(() => {
    setSub(status === "true" ? true : status === "false" ? false : false);
    return () => {
      sub;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!sub) {
    return (
      <ButtonLink
        text="Follow"
        className={`text-accent font-semibold ${className}`}
        onClick={() => {
          handleSub(sub, currentUserId, userId);
          setSub(!sub);
        }}
      />
    );
  } else {
    return (
      <ButtonLink
        text="Unollow"
        className={`text-button font-semibold ${className}`}
        onClick={() => {
          handleSub(sub, currentUserId, userId);
          setSub(!sub);
        }}
      />
    );
  }
};
