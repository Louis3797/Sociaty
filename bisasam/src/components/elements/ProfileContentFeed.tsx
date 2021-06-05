import styles from "../../styles/ProfileContentFeed.module.css";
import Content from "./Content";

export interface ProfileContentFeedProps {}

const ProfileContentFeed: React.FC<ProfileContentFeedProps> = () => {
  return (
    <div className="flex flex-col w-2/5 f-full bg-transparent rounded-3xl justify-start mt-10">
      <Content
        name="Gamer 3797"
        text="ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
        userImg="https://lh3.googleusercontent.com/a-/AOh14GgFSr2cUejuPJ3mffa6ajFGTq7DYLpIm5f7Hr7MmQ=s96-c"
      />
      <Content
        name="Gamer 3797"
        text="ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
        userImg="https://lh3.googleusercontent.com/a-/AOh14GgFSr2cUejuPJ3mffa6ajFGTq7DYLpIm5f7Hr7MmQ=s96-c"
      />
    </div>
  );
};

export default ProfileContentFeed;
