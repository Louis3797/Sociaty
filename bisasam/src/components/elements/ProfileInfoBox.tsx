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
    <div className="flex flex-row 2xl:w-2/5 lg:w-3/5 md:w-2/5 sm:w-3/5 bg-primary p-3 justify-around mt-7 rounded-3xl ">
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
