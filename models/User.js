let users = [
  {
    id: 1,
    username: 'testuser',
    password: '$2a$10$XJXVg4XPZ1X.ezKzLF2bQuiCFAVOxTh8zHMJDjjm.tZJTLf13JrXC' // hashed 'password123'
  }
];

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
users.push({
  id: 2,
  username: 'testuser2',
  password: bcrypt.hashSync('password123', salt)
});


let nextId = 2;

module.exports = {
  findByUsername: (username) => users.find(user => user.username === username),
  findById: (id) => users.find(user => user.id === id),
  create: (username, password) => {
    const newUser = { id: nextId++, username, password };
    users.push(newUser);
    return newUser;
  }
};