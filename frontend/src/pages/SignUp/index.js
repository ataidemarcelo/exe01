import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { schemaSignUp } from '../../validations/schemas';
import styles from  './signup.module.css';

function SignUp() {
  const [dataForm, setDataForm] = useState({ name: '', email: '', password: '', passwordConfirmation: '' });
  const [error, setError] = useState('');
  let history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const copyDataForm = { ...dataForm };
    
    copyDataForm[name] = value;

    setDataForm(copyDataForm);
    setError('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, passwordConfirmation } = dataForm;

    try {
      await schemaSignUp.validate({ name, email, password, passwordConfirmation });

      setError('');
      await createNewUser({ name, email, password, passwordConfirmation });
    } catch (err) {
      const { errors } = err;
      setError(errors[0]);
      return;
    }
  };

  const createNewUser = async ({ name, email, password, passwordConfirmation }) => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          displayName: name,
          email,
          password,
          passwordConfirmation,
        }),
      });
  
      if (response.status === 409) {
        setError('Usuário já existe na aplicação');
        return;
      }
  
      const user = await response.json();

      // Salvar na aplicação
      localStorage.setItem('@BlogAPI:user:', JSON.stringify(user));
      history.push('/signin');
    } catch (err) {
      setError('Falha na conexão, aguarde uns minutos e tente novamente');
      console.error(err);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Cadastro</h1>
      <form onSubmit={ handleSubmit } className={styles.form}>
        <label>
          Nome:
          <input 
            type="text" 
            name="name"
            value={ dataForm.name }
            placeholder="Nome Completo"
            onChange={ handleChange }
          />
        </label>

        <label>
          Email:
          <input 
            type="text" 
            name="email"
            value={ dataForm.email }
            placeholder="seu melhor Email"
            onChange={ handleChange }
          />
        </label>

        <label>
          Senha:
          <input 
            type="password" 
            name="password"
            value={ dataForm.password }
            placeholder="Senha (minímo 8 caracteres)"
            onChange={handleChange }
          />
        </label>

        <label>
          Confirmação da senha:
          <input 
            type="password" 
            name="passwordConfirmation" 
            value={ dataForm.passwordConfirmation }
            placeholder="Repita a senha digitada acima" 
            onChange={handleChange }
          />
        </label>

        <button 
          type="submit"
        >
          Cadastrar
        </button>
      </form>
      <span className={styles.errors}>
        {error && error}
      </span>
    </main>
  );
};

export default SignUp;
