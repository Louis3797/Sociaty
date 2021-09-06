import React from "react";
import { useSession } from "next-auth/client";
import ButtonIcon from "../button/ButtonIcon";
import SingleUserAvatar from "../UserAvatar/SingleUserAvatar";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { usePickedGif } from "../../../globals-stores/usePickedGif";

interface SubmitModalBodyProps {
  onTextChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  img: string;
  gif: string;
  textValue: string;
}

const SubmitModalBody: React.FC<SubmitModalBodyProps> = ({
  onTextChange,
  img,
  gif,
  textValue,
}) => {
  const [session] = useSession();

  const setGifUrl = usePickedGif((state) => state.setGifUrl);
  return (
    <div className="flex flex-row justify-start p-3 border-b border-primary-300 h-auto">
      <SingleUserAvatar
        size="small"
        src={session ? session.user?.image : ""}
        className="mrs-4"
        alt="UserImg"
      />
      <div className="flex flex-col w-full h-auto">
        <textarea
          value={textValue}
          placeholder="Was gibt es zu erzählen?"
          className="w-full h-10 border-0 p-2 ml-2 resize-none outline-none bg-transparent text-primary-100 text-base mr-1"
          onChange={onTextChange}
        />
        {gif.length > 0 && (
          <div className="relative h-auto w-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gif}
              alt="submit-gif"
              className="w-full h-auto rounded-20"
            />
            <ButtonIcon
              size="small"
              bgcolor="bg-secondary-600"
              onClick={() => setGifUrl("")}
              className=" top-0 m-2 absolute"
            >
              <CloseRoundedIcon fontSize="default" className="text-accent" />
            </ButtonIcon>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitModalBody;
