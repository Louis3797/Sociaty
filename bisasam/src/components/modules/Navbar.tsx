import { getSession, useSession } from "next-auth/client";
import React from "react";

import styles from "../../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  const [session, loading] = useSession();
  return (
    <div className={styles.container}>
      <p className={styles.logo}>Dislike</p>
      <img src={session?.user.image} className={styles.img}></img>
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
