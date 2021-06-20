import React, { useState } from "react";
import Button from "../../elements/button/Button";
import { SubmitModal } from "../modal/SubmitModal";

interface ContentEmptyStateProps {}

const ContentEmptyState: React.FC<ContentEmptyStateProps> = () => {
  const [showSubmitModal, setshowSubmitModal] = useState(false);
  return (
    <div className="flex flex-col w-full h-full py-5 bg-primary-800 items-center mb-4 rounded-8 justify-center">
      <h1 className="text-xl text-secondary-600 font-semibold mb-1">
        Wow much empty here
      </h1>
      <p className="text-base text-primary-200 opacity-70 font-base">
        Post something to fill the empty space
      </p>
      <Button
        text={"Post something"}
        variant="primary"
        size="big"
        className="mt-5"
        click={() => setshowSubmitModal(true)}
      />
      <SubmitModal
        isOpen={showSubmitModal}
        onRequestClose={() => setshowSubmitModal(false)}
      />
    </div>
  );
};

export default ContentEmptyState;
