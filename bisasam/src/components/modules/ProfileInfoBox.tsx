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
    <div className="flex flex-row w-full bg-primary-800 p-3 justify-around mt-4 rounded-8 ">
      <p className="md:text-base sm:text-sm font-medium">Beiträge: {posts}</p>
      <p className="md:text-base sm:text-sm  font-medium">
        Abonnenten: {follower}
      </p>
      <p className="md:text-base sm:text-sm  font-medium">
        Abonniert: {follows}
      </p>
    </div>
  );
};

export default ProfileInfoBox;
