import React, { useState } from "react";
import ButtonIcon from "../../elements/button/ButtonIcon";
import Modal from "../../elements/modal/Modal";

import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "../../elements/button/Button";

export interface EditProfileModalProps {
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const EditProfileModal: React.SFC<EditProfileModalProps> = ({
  className,
  isOpen,
  onRequestClose,
}) => {
  const [disabled, setDisabled] = useState(false);

  function handleCancel() {
    onRequestClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      className={`flex justify-center items-start focus:outline-none border-0 ${className}`}
    >
      <div className="flex flex-col w-42 sm:w-full rounded-8 h-15  bg-primary-800">
        <EPModalHeader
          close={handleCancel}
          save={() => {}}
          disabled={disabled}
        />
      </div>
    </Modal>
  );
};

export default EditProfileModal;

interface EPModalHeaderProps {
  close: () => void;
  save: () => void;
  disabled: boolean;
}

const EPModalHeader: React.FC<EPModalHeaderProps> = ({
  close,
  save,
  disabled,
}) => {
  return (
    <div className="flex items-center w-full h-7">
      <div className="flex flex-row w-full h-full items-center justify-between bg-primary-800 rounded-8">
        <div className="flex flex-row items-center justify-start ml-3">
          <ButtonIcon
            size="big"
            bgcolor="bg-secondary-600"
            click={close}
            className="mr-3"
          >
            <CloseRoundedIcon
              fontSize="default"
              className="text-secondary-600"
            />
          </ButtonIcon>
          <h1 className="text-2xl font-semibold text-primary-100 font-sans ">
            Edit your Profile
          </h1>
        </div>
        <div className="flex items-center mx-3">
          <Button
            size="big"
            click={save}
            className=""
            disabled={disabled}
            variant="primary"
            text="Save"
          />
        </div>
      </div>
    </div>
  );
};
