import UserPage from "../../../components/templates/UserPage/UserPage";
import { getToken } from "next-auth/jwt";
import { GET_USER } from "../../../graphql/querys";
import { initializeApollo } from "../../../lib/apolloClient";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetUserData {
  __typename: string;
  id: string;
  name: string;
  displayName: string;
  image: string;
  bannerUrl: string | null;
  bio: string | null;
  created_at: Date;
  numFollowing: number;
  numFollowers: number;
  numContributions: number;
  online: boolean;
  subscribed: string;
}

export interface RootProps {
  getUserData: GetUserData;
}

interface ProfilePageProps {
  data: RootProps;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
  return <UserPage data={data} />;
};

type Data = {
  data: GetUserData;
};

export const getServerSideProps = async (context: {
  req: NextApiRequest;
  res: NextApiResponse<Data>;
  query: { name: string };
}): Promise<
  | {
      notFound: boolean;
      props?: undefined;
    }
  | {
      props: {
        data: any;
      };
      notFound?: undefined;
    }
> => {
  const { name: name } = context.query;
  const req: NextApiRequest = context.req;

  const apolloClient = initializeApollo();

  const token = await getToken({ req, secret: process.env.SECRET });

  const { data } = await apolloClient.query({
    query: GET_USER,
    variables: { displayName: name, currentUserId: token?.sub },
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
};

export default ProfilePage;
