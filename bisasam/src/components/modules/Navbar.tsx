import React from "react";
import { getSession, useSession } from "next-auth/client";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  const [session] = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.logo}>Sociaty</p>
        <Link href={`/u/${sessionStorage.getItem("UID")}`}>
          <img src={session?.user.image} className={styles.img}></img>
        </Link>
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
