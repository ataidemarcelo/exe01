import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { schemaSignUp } from '../../validations/schemas';
import { useError } from '../../context/error.context';

import styles from  './signup.module.css';

const HOST = process.env.REACT_APP_API_HOST || 'localhost';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

function SignUp() {
  const [dataForm, setDataForm] = useState({ name: '', email: '', password: '', passwordConfirmation: '' });
  const { errorMessage, setErrorMessage } = useError();
  let history = useHistory();

  useEffect(() => {
    return setErrorMessage('');
  }, [setErrorMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const copyDataForm = { ...dataForm };
    
    copyDataForm[name] = value;

    setDataForm(copyDataForm);
    setErrorMessage('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, passwordConfirmation } = dataForm;

    try {
      await schemaSignUp.validate({ name, email, password, passwordConfirmation });

      setErrorMessage('');
      await createNewUser({ name, email, password, passwordConfirmation });
    } catch (err) {
      const { errors } = err;
      setErrorMessage(errors[0]);
      return;
    }
  };

  const createNewUser = async ({ name, email, password, passwordConfirmation }) => {
    try {
      const response = await fetch(`${PROTOCOL}://${HOST}/users`, {
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
        setErrorMessage('Usuário já existe na aplicação');
        return;
      }
  
      const user = await response.json();

      // Salvar na aplicação
      localStorage.setItem('@BlogAPI:email:', user.email);
      history.push('/signin');
    } catch (err) {
      setErrorMessage('Falha na conexão, aguarde uns minutos e tente novamente');
      console.log(err);
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
        {errorMessage && errorMessage}
      </span>
    </main>
  );
};

export default SignUp;
