import ContentBody from "./ContentBody";
import ContentHead from "./ContentHead";
import ContentItemList from "./ContentItemList";

export interface ContentProps {
  contentId: number;
  userImg: string;
  name: string;
  userId: string;
  text?: string;
  img?: string;
  commentAmount: number;
  likeAmount: number;
  liked: boolean;
}

const Content: React.FC<ContentProps> = ({
  contentId,
  userImg,
  name,
  userId,
  text,
  img,
  commentAmount,
  likeAmount,
  liked,
}) => {
  return (
    <div className="flex flex-col w-full h-auto bg-primary-800 mb-4 rounded-8 justify-evenly">
      <ContentHead img={userImg} name={name} userId={userId} />
      <ContentBody text={text} />
      <ContentItemList
        contentId={contentId}
        commentAmount={commentAmount}
        likeAmount={likeAmount}
        liked={liked}
      />
    </div>
  );
};

export default Content;
