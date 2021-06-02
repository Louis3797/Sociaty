import React from "react";
import styles from "../../styles/ProfileHeader.module.css";

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
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <img src={img} alt="" className={styles.userImg} />
        <div className={styles.userInfoContainer}>
          <p className={styles.username}>{name}</p>
          <p className={styles.useremail}>{email}</p>
        </div>
      </div>
      <p className={styles.userBio}>Status: {bio}</p>
    </div>
  );
};

export default ProfileHeader;
