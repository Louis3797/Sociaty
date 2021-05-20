import styles from "../../styles/Content.module.css";

export interface ContentProps {
  userImg: string;
  username: string;
  text?: string;
  img?: string;
}

const Content: React.FC<ContentProps> = ({ userImg, username, text, img }) => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.firstContainer}>
        <img src={userImg} alt="" className={styles.userImg} />
        <p className={styles.userName}>{username}</p>
      </div>
      <div className={styles.secondContainer}>
        <p className={styles.text}>{text}</p>
        <img src={img} alt="" className={styles.contentImg} />
      </div>
      <div className={styles.thirdContainer}></div>
    </div>
  );
};

export default Content;
