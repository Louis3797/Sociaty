export interface ProfileCompOneProps {
  name: string;
  img: string;
  email: string;
  bio: string;
}

const ProfileHeader: React.FC<ProfileCompOneProps> = ({
  name,
  img,
  email,
  bio,
}) => {
  return (
    <div className="flex  flex-col 2xl:w-2/5 lg:w-3/5 md:w-2/5 sm:w-3/5 bg-primary-800 rounded-8">
      <div className="h-10 w-full">
        <img
          src="https://source.unsplash.com/random"
          alt="banner"
          className="object-cover h-15 w-full"
        />
      </div>
      <div className="flex flex-row w-full h-auto bg-transparent justify-start items-center ">
        <img
          src={img}
          alt="UserImg"
          className="h-10 w-10 rounded-full object-cover mr-5 ml-5 mt-1"
        />

        <div className="flex flex-col w-full h-5/6 items-start text-justify mt-11">
          <p className="text-2xl font-semibold tracking-wide mt-1 text-button">
            {name}
          </p>
          <p className="text-base tracking-wider opacity-60">{email}</p>
        </div>
      </div>
      <p className="text-secondary-600 text-base tracking-wider ml-5 mb-4">
        Status: {bio}
      </p>
    </div>
  );
};

export default ProfileHeader;
