import React, { useState } from "react";
import styles from "../styles/Register.module.css";

const Register: React.FC = () => {
  const [username, setusername] = useState("");

  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");

  const [confirm, setconfirm] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign Up</h1>
        <form className={styles.form}>
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="email"
            className={styles.input}
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className={styles.button}>Let's go</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
