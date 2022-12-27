import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { schemaSignIn } from '../../validations/schemas';
import Loading from '../../components/Loading';

import styles from  './signin.module.css';

function SignIn() {
  const history = useHistory();
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
      await schemaSignIn.validate({ email, password });

      setIsLoading(true);

      const signIn = async () => { 
        // Fazer a chamada para API
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json'
          },
          body: JSON.stringify({
            email,
            password,
          })
        });

        const result = await response.json();
        // Em caso de Erro
        if (!response.ok) {
          setError(result.message);
          setIsLoading(false);
          return;
        }

        const { token } = result;

        localStorage.setItem('@BlogAPI:token:', token);
        history.push('/posts');

        setIsLoading(false);
      };

      setTimeout(signIn, 2000);

      return;
    } catch (err) {
      const { errors } = err;
      setError(errors[0]);
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
        {error && error}
      </span>
    </main>
  );
};

export default SignIn;
