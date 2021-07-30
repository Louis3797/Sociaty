import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Modal from "../../elements/modal/Modal";
import { POST_CONTENT } from "../../../graphql/mutations";
import SubmitModalHead from "../../elements/modal/SubmitModalHead";
import SubmitModalFooter from "../../elements/modal/SubmitModalFooter";
import SubmitModalBody from "../../elements/modal/SubmitModalBody";
import GifPicker from "../picker/GifPicker";
import { usePickedGif } from "../../../globals-stores/usePickedGif";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Router from "next/router";

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
  const [showAlert, setshowAlert] = useState(false);

  const [createSubmit] = useMutation(POST_CONTENT);

  const handleSubmit = (): void => {
    createSubmit({
      variables: {
        content_text: text,
        userId: sessionStorage.getItem("UID"),
        gif_url: gif,
      },
    });

    setshowAlert(true);
    settext("");
    setGifUrl("");
    Router.reload();
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
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={() => setshowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="default" />,
          }}
          className="text-success"
          onClose={() => setshowAlert(false)}
          severity="success"
        >
          <p className="text-primary-900 font-medium">
            Your Post was successfully created
          </p>
        </Alert>
      </Snackbar>
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
