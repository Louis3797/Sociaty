import React from "react";
import ImageIcon from "@material-ui/icons/Image";
import GifIcon from "@material-ui/icons/Gif";
import ButtonIcon from "../../elements/button/ButtonIcon";
import Button from "../../elements/button/Button";
import ButtonLink from "../button/ButtonLink";
import { usePickedGif } from "../../../globals-stores/usePickedGif";

interface SubmitModalFooterProps {
  text: string;
  img: string;
  submit: () => void;
  cancel: () => void;
  showGifModal: () => void;
}

const SubmitModalFooter: React.FC<SubmitModalFooterProps> = ({
  text,
  img,
  submit,
  cancel,
  showGifModal,
}) => {
  const gif = usePickedGif((state) => state.gifUrl);

  return (
    <div className="flex flex-row justify-between  h-auto">
      <div className="flex flex-row justify-start p-2 h-auto w-auto">
        <ButtonIcon
          size="big"
          bgcolor="bg-secondary-600"
          click={() => {}}
          disabled={img.length > 0 || gif.length != 0}
          className="mx-1"
        >
          <ImageIcon fontSize="default" className="text-secondary-600" />
        </ButtonIcon>
        <ButtonIcon
          size="big"
          bgcolor="bg-secondary-600"
          click={showGifModal}
          disabled={gif.length > 0 || img.length != 0}
          className="mx-1"
        >
          <GifIcon fontSize="default" className="text-secondary-600" />
        </ButtonIcon>
      </div>
      <div className="flex flex-row justify-center items-center p-2 h-auto w-auto">
        <p className="text-base font-normal  text-secondary-600 ">
          {text.length}/255
        </p>
        <div className="mr-2 ml-4">
          <ButtonLink disabled={false} text="Cancel" click={cancel} />
        </div>
        <div className="ml-2">
          <Button
            text="Submit"
            disabled={
              text.length > 255 || (text.length === 0 && gif.length === 0)
            }
            click={submit}
            variant="primary"
            size="big"
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitModalFooter;
