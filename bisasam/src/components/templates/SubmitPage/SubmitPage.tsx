import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/SubmitPage.module.scss";

const SubmitPage: React.FC = () => {
  const router = useRouter();
  const [session] = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.head}>
          <h1>Create a Post</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyContainerTop}>
            <img src={session.user.image} className={styles.userImg} />
            <textarea placeholder="Was gibt es zu erzählen?" />
          </div>
          <div className={styles.bodyContainerBottom}>
            <button
              className={styles.buttonCancel}
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              className={styles.buttonSubmit}
              onClick={() => router.back()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
