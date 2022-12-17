import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';

import styles from  './signup.module.css';

function SignUp() {
  const [dataForm, setDataForm] = useState({ name: '', email: '', password: '', passwordConfirmation: '' });
  const [error, setError] = useState('');

  const handleChange = async (event) => {
    const { name, value } = event.target;
    const copyFormData = { ...dataForm };
    
    copyFormData[name] = value;

    setDataForm(copyFormData);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const schema = Yup.object().shape({
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref('password'), undefined],
          'Senha e confirmação de senha precisam ser iguais',
        ),
        password: Yup.string()
          .min(6, 'A senha precisa ter no mínimo 6 caracters')
          .required('O campo password é obrigatório.'),
        email: Yup.string()
          .email('Digite um email válido')
          .required('O campo email é obrigatório.'),
        name: Yup.string()
          .required('O campo nome é obrigatório.'),
      });

      await schema.validate(dataForm);
      setError('');
    } catch (err) {
      const { errors } = err;
      setError(errors[0]);
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
            placeholder="Nome"
            onChange={ handleChange }
          />
        </label>

        <label>
          Email:
          <input 
            type="text" 
            name="email"
            value={ dataForm.email }
            placeholder="Email"
            onChange={ handleChange }
          />
        </label>

        <label>
          Senha:
          <input 
            type="password" 
            name="password"
            value={ dataForm.password }
            placeholder="Senha"
            onChange={handleChange }
          />
        </label>

        <label>
          Confirmação da senha:
          <input 
            type="password" 
            name="passwordConfirmation" 
            value={ dataForm.passwordConfirmation }
            placeholder="Confirme sua senha" 
            onChange={handleChange }
          />
        </label>

        <button type="submit" >Cadastrar</button>
      </form>
      <span className={styles.errors}>
        {error && error}
      </span>
    </main>
  );
};

export default SignUp;
