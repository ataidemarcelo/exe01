const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  // Controller -> createNewUser
    // Validar os campos (obrigatórios, formato válido, ...) -> validateFields

  // Services (regras de negócio)
    // Validar se usuário já existe -> checkUserExist
    // Adicionar novo usuário no DB -> addUser
  const newUser = req.body;

  return res.status(200).json(newUser);
});

module.exports = router;