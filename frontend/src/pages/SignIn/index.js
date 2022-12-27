import React, { useState, useEffect } from 'react';

import { schemaSignIn } from '../../validations/schemas';
import Loading from '../../components/Loading';

import { useError } from '../../context/error.context';
import { useAuth } from '../../context/auth.context';

import styles from  './signin.module.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { errorMessage, setErrorMessage } = useError();
  const { signIn, isLoading } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('@BlogAPI:user:'));

    if (user) {
      setEmail(user.email);
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === 'email') setEmail(value);
    if(name === 'password') setPassword(value);

    setErrorMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await schemaSignIn.validate({ email, password });

      await signIn({ email, password });

      return;
    } catch (err) {
      const { errors } = err;
      setErrorMessage(errors[0]);
      return;
    }
  }

  if (isLoading) return <Loading />;

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
        {errorMessage && errorMessage}
      </span>
    </main>
  );
};

export default SignIn;
