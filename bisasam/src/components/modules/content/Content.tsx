import Link from "next/link";
import ContentBody from "../../elements/content/ContentBody";
import ContentHead from "../../elements/content/ContentHead";
import ContentItemList from "../../elements/content/ContentItemList";

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
      <Link href={`/u/${userId}/contribution/${contentId}`}>
        <div>
          <ContentBody text={text} />
        </div>
      </Link>
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
