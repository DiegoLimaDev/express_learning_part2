const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: 400, msg: 'Username and password are required.' });

  const duplicate = usersDB.users.find((e) => e.username === username);
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username: username, password: hashedPassword };
    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users),
    );

    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${username} created.` });
  } catch (error) {
    res.status(500).json({ error: 500, msg: error.message });
  }
};

module.exports = { handleNewUser };
