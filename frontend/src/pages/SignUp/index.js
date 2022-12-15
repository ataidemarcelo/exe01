import React from 'react';

import styles from  './signup.module.css';

function SignUp() { 
  return (
    <main className={styles.main}>
      <h1>Cadastrar</h1>
      <form className={styles.form}>
        <label>
          Name:
          <input type="text" name="name" placeholder="Nome" />
        </label>

        <label>
          Email:
          <input type="text" name="email" placeholder="Email" />
        </label>

        <label>
          Senha:
          <input type="text" name="password" placeholder="Senha" />
        </label>

        <label>
          Confirmação da senha:
          <input type="text" name="passwordCconfirmation" placeholder="Confirme sua senha" />
        </label>

        <button type="submit" >Cadastrar</button>
      </form>
    </main>
  );
};

export default SignUp;
