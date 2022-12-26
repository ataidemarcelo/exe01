import React, { useState } from 'react';
import * as Yup from 'yup';

import Loading from '../../components/Loading';

import styles from  './signin.module.css';

function SignIn() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

      const signIn = () => { 
        setIsLoading(true);
        // Fazer a chamada para API
        console.log({ email, password })
      };
      setTimeout(signIn, 2000);
      setIsLoading(false);
      return;
    } catch (err) {
      const { errors } = err;
      setError(errors[0]);
      return;
    }
  }

  if (!isLoading) return <Loading />;

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
