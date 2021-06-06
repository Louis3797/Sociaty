import UserPage from "../../components/templates/UserPage/UserPage";
interface USER {
  findUser: any;
  id: number;
  name: string;
  email: string;
  image: string;
  bio: string;
  follower?: number;
  follows?: number;
  posts?: number;
  text?: string;
  contentImg?: string;
  commentAmount?: number;
  likeAmount?: number;
}

interface ProfilePageProps {
  data?: USER;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
  return <UserPage data={data} />;
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
