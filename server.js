const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  return res.send('Hello World');
});
// app.get('/api/users', (req, res) => {
//   const usersData = `
//   <ul>
//   ${users.map(
//     (user) => `
//     <li>
//       <h2>${user.first_name}</h2>
//       <p>${user.email}</p>
//     </li>
//     `
//   )}
//   </ul>`;
//   res.send(usersData);
// });

app.get('/api/users', (req, res) => {
  return res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.status(400).send('Invalid ID supplied');
  const user = users.find((user) => user.id === id);
  if (!user) res.send("User doesn't exist");
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
