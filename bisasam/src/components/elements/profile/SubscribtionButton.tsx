import React from "react";
import Button from "../button/Button";
import ButtonOutlined from "../button/ButtonOutlined";

interface SubscriptionButtonProps {
  status: boolean;
  onClick: () => void;
  className?: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  status,
  onClick,
  className,
}) => {
  if (status === false) {
    return (
      <ButtonOutlined
        text="Follow"
        variant="primary"
        size="big"
        className={className}
        onClick={onClick}
      />
    );
  } else if (status === true) {
    return (
      <Button
        text="Unfollow"
        variant="primary"
        size="big"
        className={className}
        onClick={onClick}
      />
    );
  }
  return <div></div>;
};

export default SubscriptionButton;
