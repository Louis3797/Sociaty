import React from "react";

interface RightPanelProps {}

const RightPanel: React.FC<RightPanelProps> = ({ children }) => {
  return (
    <div className="flex w-24 h-full justify-center  mx-3 px-5">
      <div className="mt-10 fixed">{children}</div>
    </div>
  );
};

export default RightPanel;
