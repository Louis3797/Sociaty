import React, { useState } from "react";

import Modal from "../../elements/modal/Modal";
import GifPickerSearchBar from "../../elements/gif-picker/GifSearchBar";
import GifResults from "../../elements/gif-picker/GifResults";

interface GifPickerProps {
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const GifPicker: React.FC<GifPickerProps> = ({
  className,
  isOpen,
  onRequestClose,
}) => {
  const [search, setsearch] = useState("");

  function handleCancel() {
    onRequestClose();
    setsearch("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      className={`flex justify-center items-start focus:outline-none border-0 ${className}`}
    >
      <div className="flex flex-col w-42 sm:w-full h-48 bg-primary-800 rounded-8">
        <div className="flex items-center w-full h-7">
          <GifPickerSearchBar
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            close={handleCancel}
          />
        </div>
        <div className="flex items-center justify-end bg-transparent px-4 py-1">
          <p className="font-bold text-xs text-primary-200 opacity-50">
            Gifs by GIPHY
          </p>
        </div>
        <div className="flex flex-col w-42 sm:w-full bg-transparent h-full rounded-b-8 overflow-y-scroll">
          <GifResults gifText={search} close={handleCancel} />
        </div>
      </div>
    </Modal>
  );
};

export default GifPicker;
