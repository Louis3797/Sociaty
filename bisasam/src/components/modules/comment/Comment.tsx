import React from "react";
import CommentBody from "../../elements/comment/CommentBody";
import CommentHead from "../../elements/comment/CommentHead";
import CommentItems from "../../elements/comment/CommentItems";

export interface CommentProps {
  id: string;
  contentId: string;
  comment_text: string;
  userId: string;
  created_at: string;
  numLikes: number;
  liked: boolean;
  gif_url?: string | null;
  name: string;
  displayName: string;
  userImg: string;
}

const Comment: React.FC<CommentProps> = ({
  id,
  contentId,
  comment_text,
  userId,
  created_at,
  numLikes,
  liked,
  gif_url,
  name,
  displayName,
  userImg,
}) => {
  return (
    <div className="flex flex-col h-full w-full bg-primary-800 rounded-8 py-1 mb-4">
      <CommentHead
        img={userImg}
        name={name}
        userId={userId}
        displayName={displayName}
        commentId={id}
        contentId={contentId}
      />
      <CommentBody text={comment_text} userId={userId} gifUrl={gif_url} />
      <CommentItems
        likeAmount={numLikes}
        liked={liked}
        commentId={id}
        time={created_at}
      />
    </div>
  );
};

export default Comment;
