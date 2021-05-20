import Feed from "../../modules/Feed";
import Navbar from "../../modules/Navbar";

import styles from "../../../styles/Dashboard.module.css";

export const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.innerContainer}>
        <div className={styles.feedContainer}>
          <Feed>
            <h1>Hello World</h1>
          </Feed>
        </div>
        <div className={styles.groupContainer}></div>
      </div>
    </div>
  );
};
export default Dashboard;
