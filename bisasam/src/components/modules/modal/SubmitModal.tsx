import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Modal from "../../elements/modal/Modal";
import { POST_CONTENT } from "../../../graphql/mutations";
import SubmitModalHead from "../../elements/modal/SubmitModalHead";
import SubmitModalFooter from "../../elements/modal/SubmitModalFooter";
import SubmitModalBody from "../../elements/modal/SubmitModalBody";
import GifPicker from "../picker/GifPicker";
import { usePickedGif } from "../../../globals-stores/usePickedGif";
import { useSnackbar, VariantType } from "notistack";
import { GET_USER_CONTENT } from "../../../graphql/querys";

interface SubmitModalProps {
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  className,
  isOpen,
  onRequestClose,
}) => {
  const [text, settext] = useState("");
  const [image, setimage] = useState("");

  const gif = usePickedGif((state) => state.gifUrl);
  const setGifUrl = usePickedGif((state) => state.setGifUrl);

  const [showGifModal, setshowGifModal] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAlert = (variant: VariantType): void => {
    enqueueSnackbar("Your Post was successfully created", { variant: variant });
  };

  const [createSubmit] = useMutation(POST_CONTENT, {
    refetchQueries: [
      {
        query: GET_USER_CONTENT,
        variables: {
          displayName: window.sessionStorage.getItem("UNAME"),
          currentUserId: window.sessionStorage.getItem("UID"),
        },
      },
    ],
  });

  const handleSubmit = (): void => {
    createSubmit({
      variables: {
        content_text: text,
        userId: sessionStorage.getItem("UID"),
        gif_url: gif,
      },
    });

    handleAlert("success");
    settext("");
    setGifUrl("");
  };

  function handleCancel() {
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      className={`flex justify-center items-start focus:outline-none border-0 ${className}`}
    >
      <div className="flex flex-col w-42 sm:w-full rounded-8 h-auto  bg-primary-800">
        <SubmitModalHead />
        <SubmitModalBody
          onTextChange={(e) => settext(e.currentTarget.value)}
          img={image}
          gif={gif}
          textValue={text.length === 0 ? "" : text}
        />
        <SubmitModalFooter
          text={text}
          img={image}
          submit={handleSubmit}
          cancel={handleCancel}
          showGifModal={() => setshowGifModal(true)}
        />
      </div>
      <GifPicker
        isOpen={showGifModal}
        onRequestClose={() => {
          setshowGifModal(!showGifModal);
        }}
      />
    </Modal>
  );
};
