import UserPage from "../../components/templates/UserPage/UserPage";
interface USER {
  findUser: any;
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
