import UserPage from "../../components/templates/UserPage/UserPage";
import jwt from "next-auth/jwt";
import { GET_USER } from "../../graphql/querys";
import { initializeApollo } from "../../lib/apolloClient";

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

export async function getServerSideProps(context) {
  const { name } = context.query;
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_USER,
    variables: { displayName: name },
  });

  // res.status(200).json(JSON.stringify(apolloClient.cache.extract()));

  if (data.getUserData === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}

export default ProfilePage;
