import React from 'react';

import styles from  './signin.module.css';

function SignIn() { 
  return (
    <main className={styles.main}>
      <h1>Login</h1>
      <form className={styles.form}>

        <label>
          Email:
          <input type="text" name="email" placeholder="Email" />
        </label>

        <label>
          Senha:
          <input type="text" name="password" placeholder="Senha" />
        </label>

        <button type="submit" >Cadastrar</button>
      </form>
    </main>
  );
};

export default SignIn;
