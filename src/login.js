import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';

const users = new Map();
const route = express.Router();
const form = multer();

route.use(express.urlencoded({ extended: true }));

const init_userdb = async () => {
  if (users.size !== 0) {
    return;
  }
  await fs
    .readFile('./user.json')
    .then((data) => {
      // console.log(data);
      JSON.parse(data).forEach((element) => {
        users.set(element.username, element);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const validate_user = async (username, password) => {
  try {
    const user = users.get(username);
    if (!user || user.password !== password) {
      return false;
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};

route.post('/login', form.none(), async (req, res) => {
  if (users.size === 0) {
    await init_userdb();
  }
  if (req.session.logged === true) {
    req.session.logged = false;
  }
  const user = await validate_user(req.body.username, req.body.password);
  if (user) {
    req.session.username = user.username;
    req.session.role = user.role;
    req.session.timestamp = Date.now();
    req.session.logged = false;
  } else {
    req.session.username = null;
  }
  if (user && user.enabled === false) {
    res.status(401).json({
      status: 'failed',
      message: `User '${user.username}' is currently disabled`,
    });
  }
  if (user && user.enabled === true) {
    req.session.logged = true;
    res.json({
      status: 'success',
      user: {
        username: user.username,
        role: user.role,
      },
    });
  }
  if (!user) {
    res.status(401).json({
      status: 'failed',
      message: 'Incorrect username or password',
    });
  }
});

route.get('/login', async (req, res) => {
  console.log(req.session);
  var username = req.session.username;
  if (username == null) {
    res.status(401).json({
      status: 'failed',
      message: 'Incorrect username or password',
    });
  } else {
    var role = req.session.role;
    var logged = req.session.logged;
    if (req.session.logged === false) {
      res.status(401).json({
        status: 'failed',
        message: `User '${username}' is currently disabled`,
      });
    } else {
      if (logged === true) {
        res.json({
          status: 'success',
          user: {
            username: username,
            role: role,
          },
        });
      }
    }
  }
});

route.post('/logout', (req, res) => {
  if (req.session.logged === true) {
    req.session.destroy();
    res.end();
  } else {
    res.end({
      status: 'failed',
      message: 'Unauthorized',
    });
  }
});

route.get('/me', async (req, res) => {
  if (req.session.logged === true) {
    const user = users.get(req.session.username);
    res.json({
      status: 'success',
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized',
    });
  }
});

route.post('/register', form.none(), async (req, res) => {
  if (users.size === 0) {
    await init_userdb();
  }

  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  if (username.length == 0 || password.length == 0) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing fields',
    });
  }

  if (username.length < 3) {
    return res.status(400).json({
      status: 'failed',
      message: 'Username must be at least 3 characters!',
    });
  }

  if (users.has(username)) {
    return res.status(400).json({
      status: 'failed',
      message: `Username ${username} already exists`,
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      status: 'failed',
      message: 'Password must be at least 8 characters',
    });
  }

  if (role != 'student' && role != 'user') {
    return res.status(400).json({
      status: 'failed',
      message: `Role can only be either 'student' or 'user'`,
    });
  }

  try {
    await update_user(username, password, role);
    return res.status(200).json({
      status: 'success',
      user: {
        username: username,
        role: role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      message: 'Account created but unable to save into the database',
    });
  }
});

const update_user = async function (username, password, role) {
  // update memory
  const user = users.get(username);
  if (!user) {
    users.set(username, {
      username: username,
      password: password,
      role: role,
      enabled: true,
    });
  } else {
    users[username].password = password;
    users[username].role = role;
  }

  // update json
  const userjson = [];
  users.forEach((value, key, map) => {
    userjson.push(value);
  });
  const data = JSON.stringify(userjson);
  await fs.writeFile('./user.json', data, (err) => {
    if (err) {
      return false;
    }
    return true;
  });
};

export default route;
