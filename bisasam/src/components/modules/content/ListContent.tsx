import ContentBody from "../../elements/content/multi/ContentBody";
import ContentHead from "../../elements/content/multi/ContentHead";
import ContentItemList from "../../elements/content/multi/ContentItemList";

export interface ListContentProps {
  contentId: string;
  userImg: string;
  name: string;
  userId: string;
  text?: string;
  img?: string;
  commentAmount: number;
  likeAmount: number;
  liked: boolean;
  displayName: string;
  createdAt: string;
  gifUrl?: string;
}

const ListContent: React.FC<ListContentProps> = ({
  contentId,
  userImg,
  name,
  userId,
  text,
  img,
  commentAmount,
  likeAmount,
  liked,
  displayName,
  createdAt,
  gifUrl,
}) => {
  return (
    <div className="flex flex-col w-full h-auto bg-primary-800 mb-4 rounded-8 justify-evenly">
      <ContentHead
        img={userImg}
        name={name}
        userId={userId}
        displayName={displayName}
        time={createdAt}
      />

      <ContentBody
        text={text}
        contentId={contentId}
        userId={userId}
        gifUrl={gifUrl}
      />

      <ContentItemList
        contentId={contentId}
        commentAmount={commentAmount}
        likeAmount={likeAmount}
        liked={liked}
      />
    </div>
  );
};

export default ListContent;
