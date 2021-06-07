import Content from "../elements/Content";

export interface ProfileContentFeedProps {
  userImg?: string;
  name?: string;
  text?: string;
  img?: string;
  commentAmount?: number;
  likeAmount?: number;
}

const ProfileContentFeed: React.FC<ProfileContentFeedProps> = ({
  userImg,
  name,
  text,
  img,
  commentAmount,
  likeAmount,
}) => {
  return (
    <div className="flex flex-col w-full f-full items-center justify-start mt-10">
      <h2>Much emty here :(</h2>
    </div>
  );
};

export default ProfileContentFeed;
