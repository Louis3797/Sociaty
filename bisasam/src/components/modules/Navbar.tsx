import React from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import { SolidChatBubble, SolidPlus } from "../../icons";

const Navbar: React.FC = () => {
  const [session] = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Link href={"/"}>
          <p className={styles.logo}>Sociaty</p>
        </Link>
        <div className={styles.iconContainer}>
          <Link href={"/chats"}>
            <SolidChatBubble />
          </Link>
          <Link href={"/submit"}>
            <SolidPlus />
          </Link>
          <Link href={`/u/${sessionStorage.getItem("UID")}`}>
            <img
              src={session?.user.image}
              className={styles.img}
              alt="UserImg"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
