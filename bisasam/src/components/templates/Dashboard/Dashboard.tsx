import Feed from "../../modules/Feed";
import Navbar from "../../modules/Navbar";

import styles from "../../../styles/Dashboard.module.css";
import { useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_USER_ID } from "../../../graphql/querys";

interface ID {
  id: Number;
}

interface ID_DATA {
  findUserWithEmail: ID;
}

export const Dashboard: React.FC = () => {
  const [session] = useSession();

  // Get the email of the current User
  const userEmail = session?.user.email.toString();

  // Query with the current User email
  const { loading, error, data } = useQuery<ID_DATA>(GET_USER_ID, {
    variables: { email: userEmail.toString() },

    // After 5 min check again
    pollInterval: 50000,
  });

  useEffect(() => {
    // If the data is loading
    if (loading) console.log("loading...");

    // If an error occurs
    if (error) console.log("error...");

    // If the Query data is undefined
    if (data == undefined) console.log("undefined data");
    // If the session is true than setItem UID in SessionStorage , The item is the User_ID
    else if (session) {
      window.sessionStorage.setItem(
        "UID",
        data?.findUserWithEmail.id.toString()
      );
    }
  }, [session, data]);

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
