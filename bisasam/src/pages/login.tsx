import React from "react";

//We use the same css File like in register.tsx, bescause its equal.
import styles from "../styles/Register.module.css";

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome back</h1>
        <form className={styles.form}>
          <input type="email" className={styles.input} placeholder="username" />

          <input
            type="password"
            className={styles.input}
            placeholder="Password"
          />

          <button className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
