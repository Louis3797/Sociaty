import { GetServerSideProps } from "next";
import UserPage from "../../../components/templates/UserPage/UserPage";
export interface GetUserData {
  __typename: string;
  id: string;
  name: string;
  displayName: string;
  image: string;
  bannerUrl?: any;
  bio?: any;
  created_at: Date;
  numFollowing: number;
  numFollowers: number;
  numContributions: number;
  online: boolean;
  content: [] | null;
}

export interface RootProps {
  User: any;
  getUserData: GetUserData;
}

interface ProfilePageProps {
  data: RootProps;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
  return <UserPage data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/u/${id}`);

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default ProfilePage;
