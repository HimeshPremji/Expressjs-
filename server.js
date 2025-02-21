const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 3000 || process.env.PORT;
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));

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
    if (!user) res.send("User not found");
    res.json(user);
  })
  .patch((req, res) => {
    // Edit user details
    return res.json({ message: 'User updated' });
  })
  // Delete user using id
  .delete((req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send('Invalid ID supplied');

    const index = users.findIndex((user) => user.id === id);
    if (index === -1)
      return res.status(404).json({ message: 'User not found' });
    users.splice(index, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      if (err) return res.status(500).json({ message: 'An error occurred' });
      res.json({ message: `User deleted, ID was ${index + 1}` });
    });
  });

app.post('/api/users', (req, res) => {
  const body = req.body;
  const id = users.length + 1;
  const newUser = { id, ...body };
  users.push(newUser);
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    if (err) return res.status(500).json({ message: 'An error occurred' });
    res.json({ message: `User added hehe, User ID is ${id} ` });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
