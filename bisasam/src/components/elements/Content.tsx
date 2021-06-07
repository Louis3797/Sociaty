import { ShareIcon, SolidChatBubble, SolidRocket } from "../../icons";

export interface ContentProps {
  userImg: string;
  name: string;
  text?: string;
  img?: string;
  commentAmount?: number;
  likeAmount?: number;
}

const Content: React.FC<ContentProps> = ({
  userImg,
  name,
  text,
  img,
  commentAmount,
  likeAmount,
}) => {
  console.log(text);
  return (
    <div className="flex flex-col w-full h-auto bg-primary-800 mb-4 rounded-8 justify-evenly">
      <div className="flex flex-row w-full h-7 items-center bg-transparent">
        <img
          src={userImg}
          className="h-6 w-6 rounded-full object-cover ml-4 mr-4"
          alt="UserImg"
        />
        <p className="text-lg font-semibold tracking-wide">{name}</p>
      </div>
      <div className="w-full h-auto bg-transparent mt-1">
        <p className="break-words mr-5 ml-4 mb-4 text-secondary">{text}</p>
      </div>
      <div className="items-center justify-end bg-transparent flex flex-row w-full h-5.5">
        <ShareIcon className="text-base mr-9" />
        <div className="flex flex-row items-center mr-8">
          <SolidChatBubble className="text-base" />
          <p className="text-sm font-normal ml-2">{commentAmount}</p>
        </div>
        <div className="flex flex-row items-center mr-8">
          <SolidRocket className="text-base" />
          <p className="text-sm font-normal ml-2 ">{likeAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default Content;
