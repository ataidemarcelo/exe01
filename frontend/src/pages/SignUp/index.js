import React from 'react';
import { useState } from 'react';
import styles from  './signup.module.css';

function SignUp() {
  const [dataForm, setDataForm] = useState({ name: '', email: '', password: '', passwordConfirmation: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const copyFormData = { ...dataForm };
    
    copyFormData[name] = value;
    setDataForm(copyFormData);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(dataForm);
  };


  return (
    <main className={styles.main}>
      <form onSubmit={ handleSubmit } className={styles.form}>
        <label>
          Name:
          <input 
            type="text" 
            name="name"
            value={ dataForm.name }
            placeholder="Nome"
            onChange={handleChange }
          />
        </label>

        <label>
          Email:
          <input 
            type="text" 
            name="email"
            value={ dataForm.email }
            placeholder="Email"
            onChange={handleChange }
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
    </main>
  );
};

export default SignUp;
