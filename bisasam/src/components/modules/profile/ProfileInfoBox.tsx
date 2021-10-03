import React, { useContext } from "react";
import { UserpageContext } from "../../../context/userpageContext";

const ProfileInfoBox: React.FC = () => {
  const [userdata] = useContext(UserpageContext);
  return (
    <div className="flex flex-row w-full bg-primary-800 p-3 justify-around mt-4 rounded-8">
      <p className="md:text-base sm:text-sm font-medium">
        Beiträge: {userdata.numContributions}
      </p>
      <p className="md:text-base sm:text-sm  font-medium">
        Abonnenten: {userdata.numFollowers}
      </p>
      <p className="md:text-base sm:text-sm  font-medium">
        Abonniert: {userdata.numFollowing}
      </p>
    </div>
  );
};

export default ProfileInfoBox;
