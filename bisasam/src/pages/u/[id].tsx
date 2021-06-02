import { useSession } from "next-auth/client";
import React from "react";
import ProfileHeader from "../../components/elements/ProfileHeader";
import ProfileInfoBox from "../../components/elements/ProfileInfoBox";
import Navbar from "../../components/modules/Navbar";
import { GET_USER_WITH_ID } from "../../graphql/querys";
import { initializeApollo } from "../../lib/apolloClient";
import styles from "../../styles/ProfilePage.module.css";

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
  console.log(data.findUser.name);
  const [session] = useSession();
  return (
    <>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.itemContainer}>
          <ProfileHeader
            name={data.findUser.name}
            img={data.findUser.image}
            email={data.findUser.email}
            bio={data.findUser.bio ? data.findUser.bio : "Hey im new here"}
          />
          <ProfileInfoBox follower={0} follows={0} posts={0} />
        </div>
      </div>
    </>
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
