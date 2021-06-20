import UserPage from "../../../components/templates/UserPage/UserPage";

export interface Hashtags {
  text: string;
}
export interface ContentUser {
  __typename: string;
  id: string;
  displayName: string;
  name: string;
  image: string;
}

export interface Content {
  __typename: string;
  id: string;
  content_text: string;
  userId: string;
  image_id?: any;
  created_at: Date;
  numLikes: number;
  numComments: number;
  gif_url?: string;
  tags?: Hashtags;
  user: ContentUser;
}

export interface FindUser {
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
  content: Content[];
}

export interface RootProps {
  findUser: FindUser;
}

interface ProfilePageProps {
  data: RootProps;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
  return <UserPage data={data} />;
};

export async function getServerSideProps(context) {
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
}

export default ProfilePage;
