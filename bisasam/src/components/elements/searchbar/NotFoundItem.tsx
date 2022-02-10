import React from "react";

const NotFoundItem: React.FC = ({ ...props }) => {
  return (
    <div
      className="flex items-center w-full h-full p-2 bg-transparent hover:bg-primary-300 justify-center"
      {...props}
    >
      <p className="font-normal text-base text-button">
        Sry but I cant find your friend :(
      </p>
    </div>
  );
};

export default NotFoundItem;
