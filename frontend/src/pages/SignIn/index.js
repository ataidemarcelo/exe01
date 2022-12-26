import React, { useState } from 'react';
import * as Yup from 'yup';

import styles from  './signin.module.css';

function SignIn() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === 'email') setEmail(value);
    if(name === 'password') setPassword(value);

    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .required('O campo password é obrigatório.')
          .min(6, 'A senha precisa ter no mínimo 6 caracters'),
        email: Yup.string()
          .email('Digite um email válido')
          .required('O campo email é obrigatório.')
      });

      await schema.validate({ email, password });

      // Fazer a chamada para API
      console.log({ email, password });
    } catch (err) {
      const { errors } = err;
      setError(errors[0]);
      return;
    }
  }

  return (
    <main className={styles.main}>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit } className={styles.form}>

        <label>
          Email:
          <input 
            type="text" 
            name="email" 
            placeholder="Email"
            value={ email }
            onChange={ handleChange }
          />
        </label>

        <label>
          Senha:
          <input 
            type="password" 
            name="password" 
            placeholder="Senha"
            value={ password }
            onChange={ handleChange }
          />
        </label>

        <button type="submit" >Entrar</button>
      </form>
      <span className={styles.errors}>
        {error && error}
      </span>
    </main>
  );
};

export default SignIn;
