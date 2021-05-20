import React from "react";
import { getSession, useSession } from "next-auth/client";

import styles from "../../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  const [session] = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.logo}>The Sociaty</p>
        <p>{session.user.name}</p>
        <p>{session.user.email ? "" : "null"}</p>
        <p>{session.user.image}</p>
        <img src={session?.user.image} className={styles.img}></img>
      </div>
    </div>
  );
};

export default Navbar;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
