import { ShareIcon, SolidChatBubble, SolidRocket } from "../../icons";

export interface ContentProps {
  userImg: string;
  name: string;
  text?: string;
  img?: string;
}

const Content: React.FC<ContentProps> = ({ userImg, name, text, img }) => {
  return (
    <div className="flex flex-col w-full h-auto bg-primary mb-4 rounded-3xl justify-evenly">
      <div className="flex flex-row w-full h-1/5 items-center bg-transparent">
        <img
          src={userImg}
          className="h-4/5 w-auto rounded-full object-cover ml-5 mr-4"
        />
        <p className="text-lg font-semibold tracking-wide">{name}</p>
      </div>
      <div className="w-full h-auto bg-transparent">
        <p className=" break-words mr-5 ml-5 mb-4">{text}</p>
      </div>
      <div className="items-center justify-around bg-transparent p-1 flex flex-row w-full h-26">
        <ShareIcon className="text-base" />
        <SolidChatBubble className="text-base" />
        <SolidRocket className="text-base" />
      </div>
    </div>
  );
};

export default Content;
