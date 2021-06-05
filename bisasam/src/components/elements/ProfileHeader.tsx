import React from "react";

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
    <div className="flex flex-col w-2/5 bg-primary p-5 rounded-3xl">
      <div className="flex flex-row w-full bg-transparent justify-start items-center ">
        <img
          src={img}
          alt="UserImg"
          className="h-16 w-auto rounded-full object-cover mr-5"
        />

        <div className="flex flex-col w-full h-5/6 justify-between items-start text-justify">
          <p className="text-2xl font-semibold tracking-wide">{name}</p>
          <p className="text-base tracking-wider opacity-60">{email}</p>
        </div>
      </div>
      <p className="text-base tracking-wider mt-6">Status: {bio}</p>
    </div>
  );
};

export default ProfileHeader;
