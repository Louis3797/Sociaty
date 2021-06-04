import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { POST_CONTENT } from "../../../graphql/mutations";
import styles from "../../../styles/SubmitPage.module.scss";

//Add error toast if u cant submit bc of text size

const SubmitPage: React.FC = () => {
  const router = useRouter();
  const [session] = useSession();
  const [text, settext] = useState("");

  const [addTodo] = useMutation(POST_CONTENT);

  function handleSubmit(text: String) {
    if (text.length <= 255) {
      addTodo({
        variables: {
          content_text: text.toString(),
          user_id: parseInt(sessionStorage.getItem("UID")),
        },
      });

      router.back();
      settext("");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.head}>
          <h1>Create a Post</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyContainerTop}>
            <img src={session.user.image} className={styles.userImg} />
            <textarea
              placeholder="Was gibt es zu erzählen?"
              onChange={(event) => settext(event.target.value)}
            />
          </div>
          <div className={styles.bodyContainerBottom}>
            <p>{text.length}/255</p>
            <button
              className={styles.buttonCancel}
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              className={styles.buttonSubmit}
              onClick={() => handleSubmit(text)}
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
