import * as Yup from 'yup';

const schemaSignUp = Yup.object().shape({
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
    .required('O campo nome é obrigatório.')
    .min(8, 'O campo nome precisa ter no mínimo 8 caracters'),
});

const schemaSignIn = Yup.object().shape({
  password: Yup.string()
    .required('O campo password é obrigatório.')
    .min(6, 'A senha precisa ter no mínimo 6 caracters'),
  email: Yup.string()
    .email('Digite um email válido')
    .required('O campo email é obrigatório.')
});

export {
  schemaSignIn,
  schemaSignUp,
};