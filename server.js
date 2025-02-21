const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 3000 || process.env.PORT;

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

// app.get('/api/users/:id', (req, res) => {
//   const id = Number(req.params.id);
//   if (isNaN(id)) res.status(400).send('Invalid ID supplied');
//   const user = users.find((user) => user.id === id);
//   if (!user) res.send("User doesn't exist");
//   res.json(user);
// });
//
// app.post('/api/users', (req, res) => {
//   res.send('User added');
// });

// This is a dumb approach to handle the routes methods in a single route
// instead of using the this method we can use
// the app.Route() method to handle the routes methods in a single route

app
  .route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) res.status(400).send('Invalid ID supplied');
    const user = users.find((user) => user.id === id);
    if (!user) res.send("User doesn't exist");
    res.json(user);
  })
  .patch((req, res) => {
    // Edit user details
    return res.json({ message: 'User updated' });
  })
  .delete((req, res) => {
    // Delete user details
    return res.json({ message: 'User updated' });
  });

app.post('/api/users', (req, res) => {
  res.json({ message: 'User added' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
