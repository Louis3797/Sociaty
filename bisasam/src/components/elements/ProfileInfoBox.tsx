interface ProfileInfoBoxProps {
  follower: number;
  follows: number;
  posts: number;
}

const ProfileInfoBox: React.FC<ProfileInfoBoxProps> = ({
  follower,
  follows,
  posts,
}) => {
  return (
    <div className="flex flex-row w-2/5 bg-primary p-3 rounded-3xl justify-around mt-10">
      <p className="text-base font-medium">Beiträge: {posts}</p>
      <p className="text-base font-medium">Abonnenten: {follower}</p>
      <p className="text-base font-medium">Abonniert: {follows}</p>
    </div>
  );
};

export default ProfileInfoBox;
