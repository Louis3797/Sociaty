import Content from "./Content";

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
    <div className="flex flex-col 2xl:w-2/5 lg:w-3/5 md:w-2/5 sm:w-3/5 f-full bg-transparent items-center justify-start mt-10">
      <h2>Much emty here :(</h2>
    </div>
  );
};

export default ProfileContentFeed;
