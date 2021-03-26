import Head from "next/head";
import styles from "../styles/Home.module.css";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dislike</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
