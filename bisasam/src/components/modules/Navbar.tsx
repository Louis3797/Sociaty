import React from "react";
import { getSession, useSession } from "next-auth/client";

import styles from "../../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  const [session] = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.logo}>Sociaty</p>
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
