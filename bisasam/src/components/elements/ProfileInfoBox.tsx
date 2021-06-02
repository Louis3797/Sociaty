import styles from "../../styles/ProfileInfoBox.module.css";

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
    <div className={styles.container}>
      <p className={styles.stats}>Beiträge: {posts}</p>
      <p className={styles.stats}>Abonnenten: {follower}</p>
      <p className={styles.stats}>Abonniert: {follows}</p>
    </div>
  );
};

export default ProfileInfoBox;
