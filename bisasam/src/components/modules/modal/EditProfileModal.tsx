import React, { useEffect, useState } from "react";
import ButtonIcon from "../../elements/button/ButtonIcon";
import Modal from "../../elements/modal/Modal";

import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "../../elements/button/Button";
import { InputField } from "../../elements/input/InputField";
import SingleUserAvatar from "../../elements/UserAvatar/SingleUserAvatar";
import { useSession } from "next-auth/client";
import { UPDATE_PROFILE } from "../../../graphql/mutations";
import { OperationVariables, useMutation } from "@apollo/client";
import { useSnackbar, VariantType } from "notistack";

export interface EditProfileModalProps {
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
  bannerUri: string | null;
  displayedName: string;
  bio: string | null;
}

const EditProfileModal: React.SFC<EditProfileModalProps> = ({
  className,
  isOpen,
  onRequestClose,
  bannerUri,
  displayedName,
  bio,
}) => {
  function handleCancel() {
    onRequestClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      className={`flex justify-center items-start focus:outline-none border-0 ${className}`}
    >
      <div className="flex flex-col w-42 sm:w-full rounded-8 h-auto bg-primary-800 overflow-y-auto">
        <EPModalHeader close={handleCancel} />
        <EPModalBody
          bannerUri={bannerUri}
          displayedName={displayedName}
          bio={bio}
        />
      </div>
    </Modal>
  );
};

export default EditProfileModal;

interface EPModalHeaderProps {
  close: () => void;
}

const EPModalHeader: React.FC<EPModalHeaderProps> = ({ close }) => {
  return (
    <div className="flex items-center w-full h-7">
      <div className="flex flex-row w-full h-full py-2 items-center justify-between bg-primary-800 rounded-8">
        <div className="flex flex-row items-center justify-start ml-3">
          <ButtonIcon
            size="big"
            bgcolor="bg-secondary-600"
            onClick={close}
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
      </div>
    </div>
  );
};

interface EPModalBodyProps {
  bannerUri: string | null;
  displayedName: string;
  bio: string | null;
}

const EPModalBody: React.FC<EPModalBodyProps> = ({
  bannerUri,
  displayedName,
  bio,
}) => {
  const [session] = useSession();
  const [bUri, setbUri] = useState<string>(bannerUri === null ? "" : bannerUri);
  const [dName, setdName] = useState<string>(displayedName);
  const [newBio, setNewBio] = useState<string>(bio);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAlert = (variant: VariantType): void => {
    enqueueSnackbar("Your changes has benn saved", { variant: variant });
  };

  const [updateProfile] = useMutation<string, OperationVariables>(
    UPDATE_PROFILE
  );

  const handleError = () => {
    return bUri.length > 255 || dName.length > 25 || newBio.length > 160;
  };

  const handleSubmit = async (event) => {
    await updateProfile({
      variables: {
        userId: window.sessionStorage.getItem("UID"),
        displayName: dName,
        bio: newBio,
        bannerUrl: bUri,
      },
    });
    handleAlert("success");
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-start justify-center w-full h-full py-4 px-3">
      <div className="flex flex-row w-full items-center justify-start">
        <SingleUserAvatar
          src={session.user.image}
          size="big"
          alt="Current User Avatar"
          className="mr-4"
        />
        <div className="flex flex-col w-full items-start justify-start">
          <p className="text-xl font-semibold text-primary-200">
            @{session.user.name}
          </p>
          <p className="text-base font-semibold text-primary-200">
            {session.user.email}
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex  flex-col w-full h-full items-start justify-center bg-transparent relative space-y-5 mt-5"
      >
        <InputField
          name="bannerUri-input"
          counter={255}
          textarea
          label="Banner Uri"
          placeholder="Add an image url to edit your Banner"
          value={bUri}
          onChange={(e) => {
            setbUri(e.target.value);
          }}
          rows={4}
        />
        <InputField
          name="displayName-input"
          counter={25}
          label="Username"
          value={dName}
          onChange={(e) => {
            setdName(e.target.value);
          }}
        />
        <InputField
          name="status-input"
          counter={160}
          textarea
          label="Status"
          value={newBio}
          onChange={(e) => {
            setNewBio(e.target.value);
          }}
          rows={3}
        />
        <div className="flex w-full h-full justify-end flex-row">
          <Button
            size="big"
            onClick={() => {}}
            className=""
            disabled={handleError()}
            variant="primary"
            text="Save"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};
