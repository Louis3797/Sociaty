import { RefetchQueriesFunction, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { POST_COMMENT } from "../../../graphql/mutations";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ButtonIcon from "../button/ButtonIcon";
import { Input } from "../input/Input";
import SingleUserAvatar from "../UserAvatar/SingleUserAvatar";
import GifIcon from "@material-ui/icons/Gif";
import { useSession } from "next-auth/react";
import GifPicker from "../../modules/picker/GifPicker";
import { usePickedGif } from "../../../globals-stores/usePickedGif";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useSnackbar, VariantType } from "notistack";
import { GET_COMMENTS_OF_CONTENT } from "../../../graphql/querys";

export interface CommentFieldProps {
  contentId: string;
}

const CommentField: React.FC<CommentFieldProps> = ({ contentId }) => {
  const { data: session } = useSession();

  const [text, settext] = useState("");
  const [gif, setgif] = useState("");
  const [showGifModal, setshowGifModal] = useState(false);
  const [createComment] = useMutation(POST_COMMENT, {
    refetchQueries: [
      {
        query: GET_COMMENTS_OF_CONTENT,
        variables: {
          contentId: contentId,
          currentUserId: window.sessionStorage.getItem("UID"),
        },
      },
    ],
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAlert = (variant: VariantType): void => {
    enqueueSnackbar("Your comment has been posted", { variant: variant });
  };

  function handleSubmit(text: String): void {
    if (text.length <= 255 && text.length !== 0) {
      createComment({
        variables: {
          contentId: contentId.toString(),
          comment_text: text,
          userId: window.sessionStorage.getItem("UID"),
          gif_url: gif,
        },
      });
      settext("");
      setgif("");
      handleAlert("success");
    }
  }

  return (
    <div className="flex flex-row h-auto items-center justify-center w-full bg-primary-800 p-2 rounded-5">
      <SingleUserAvatar
        src={
          !!session && typeof session.user?.image === "string"
            ? session.user?.image
            : ""
        }
        size="small"
        alt="User Image"
      />
      <form className="flex flew-row items-center h-auto px-2 w-full bg-primary-600 rounded-5 py-1 mx-2">
        <div className="flex flex-col w-full h-auto">
          <Input
            textarea={false}
            type="text"
            placeholder="Leave a Comment ..."
            value={text}
            className="h-auto w-full bg-primary-600 rounded-5 focus:outline-none text-primary-200"
            onChange={(e) => settext(e.target.value)}
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
                onClick={() => setgif("")}
                className=" top-0 m-2 absolute"
              >
                <CloseRoundedIcon fontSize="default" className="text-accent" />
              </ButtonIcon>
            </div>
          )}
        </div>
        <p
          className={`${
            text.length > 255 ? "text-error" : "text-button text-opacity-50"
          } font-medium text-sm  mx-2`}
        >
          {text.length}/255
        </p>
        {/* <ButtonIcon
          size="big"
          bgcolor="bg-secondary-600 p-1"
          onClick={() => {
            setshowGifModal(true);
          }}
          disabled={gif.length > 0}
          className="mx-1"
        >
          <GifIcon fontSize="default" className="text-secondary-600" />
        </ButtonIcon> */}
        <ButtonIcon
          size="small"
          bgcolor="bg-secondary-600"
          className="p-1 "
          disabled={text.length > 255 || text.length === 0}
          onClick={() => handleSubmit(text)}
        >
          <ArrowUpwardRoundedIcon
            fontWeight="default"
            className="hover:text-accent-hover"
          />
        </ButtonIcon>
      </form>
    </div>
  );
};

export default CommentField;
