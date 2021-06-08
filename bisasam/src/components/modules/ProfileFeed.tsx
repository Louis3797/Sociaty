import Content from "../elements/content/Content";

export interface ProfileFeed {
  userImg?: string;
  name?: string;
  text?: string;
  img?: string;
  commentAmount?: number;
  likeAmount?: number;
}

const ProfileFeed: React.FC<ProfileFeed> = ({
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

export default ProfileFeed;
