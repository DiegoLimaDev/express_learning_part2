const usersDB = {
  users: require('../model/users.json'),
  setUsers: (data) => {
    this.users = data;
  },
};
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: 400, msg: 'Username and password are required.' });

  const foundUser = usersDB.users.find((e) => e.username === username);
  if (!foundUser) return res.sendStatus(401); //unauthorized

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.sendStatus(401);

  return res.json({ sucess: `${username} is logged in.` });
};

module.exports = { handleLogin };
