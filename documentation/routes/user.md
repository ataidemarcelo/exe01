## Blog API - Endpoints 👉 **_`users`_**

### 👉 Method: **POST** _`/users`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

1. `404 - NOT_FOUND` -> se a API não existir ✅
2. `400 - BAD_REQUEST` -> se não tem os campos obrigatórios ✅
3. `400 - BAD_REQUEST` -> se os campos não são string ✅
4. `400 - BAD_REQUEST` -> se displayName não tem pelo menos 8 caracters ✅
5. `400 - BAD_REQUEST` -> se os campos estão vazios ✅
6. `400 - BAD_REQUEST` -> se não é um email válido ✅
7. `400 - BAD_REQUEST` -> se o password não tem no mínimo 6 caracteres ✅
8. `400 - BAD_REQUEST` -> se password e passwordConfirmation não são iguais
9. `409 - CONFLICT` -> se usuário já existe
10. `500 - INTERNAL_SERVER_ERROR` -> se der erro ao tentar criar a conta do usuário
<br />
</details>

### Cenário de Sucesso:

- Objetivo: Criar um novo registro de um usuário
- Código HHTP (sucesso): `201 - CREATED`

- Campos obrigatórios: displayName, email, password, passwordConfirmation
- Input (Request Body) (exemplo):
```json
{
  "displayName": "User Um",
  "email": "valid_email@email.com",
  "password": "123456",
  "passwordConfirmation": "123456"
}

```
- Output (exemplo):
```json
{
  "id": 01,
  "displayName": "User Um",
  "email": "valid_email@email.com",
  "updatedAt": "2022-12-11T16:52:38.122Z",
  "createdAt": "2022-12-11T16:52:38.122Z"
}
```