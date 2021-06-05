import { useSession } from "next-auth/client";
import React from "react";
import ProfileContentFeed from "../../components/elements/ProfileContentFeed";
import ProfileHeader from "../../components/elements/ProfileHeader";
import ProfileInfoBox from "../../components/elements/ProfileInfoBox";
interface USER {
  findUser: any;
  id: number;
  name: string;
  email: string;
  image: string;
  bio: string;
}

interface ProfilePageProps {
  data?: USER;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
  const [session] = useSession();
  return (
    <div className="flex flex-col w-full h-screen bg-bg items-center">
      <div className="flex flex-col w-11/12 items-center mt-40 h-auto">
        <ProfileHeader
          name={data.findUser.name}
          img={data.findUser.image}
          email={data.findUser.email}
          bio={data.findUser.bio ? data.findUser.bio : "Hey im new here"}
        />
        <ProfileInfoBox follower={0} follows={0} posts={0} />
        <ProfileContentFeed />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`http://localhost:3000/api/u/${id}`);

  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default ProfilePage;
