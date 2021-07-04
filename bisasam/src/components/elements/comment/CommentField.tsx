import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { POST_COMMENT } from "../../../graphql/mutations";
import AddIcon from "@material-ui/icons/Add";
import ButtonIcon from "../button/ButtonIcon";

export interface CommentFieldProps {
  contentId: string;
}

const CommentField: React.FC<CommentFieldProps> = ({ contentId }) => {
  const [text, settext] = useState("");

  const [createComment] = useMutation(POST_COMMENT);

  function handleSubmit(text: String): void {
    if (text.length <= 255 && text.length !== 0) {
      createComment({
        variables: {
          contentId: contentId.toString(),
          comment_text: text,
          userId: window.sessionStorage.getItem("UID"),
        },
      });
      settext("");
    }
  }
  return (
    <div className="flex flex-col h-auto items-center justify-center w-full bg-primary-600 rounded-b-5">
      <form className="flex flew-row items-center h-auto px-2 w-full bg-primary-600 rounded-5 py-1">
        <input
          type="text"
          placeholder="Leave a Comment ..."
          value={text}
          className="h-auto w-full bg-primary-600 rounded-5 focus:outline-none text-primary-200"
          onChange={(e) => settext(e.target.value)}
        />
        <p className="font-medium text-secondary-600 mx-2">{text.length}/255</p>
        <ButtonIcon
          size="small"
          bgcolor="bg-secondary-600"
          className="p-2 hover:text-secondary-600"
          disabled={text.length > 255 || text.length === 0}
          onClick={() => handleSubmit(text)}
        >
          <AddIcon fontWeight="default" />
        </ButtonIcon>
      </form>
    </div>
  );
};

export default CommentField;
