import express from 'express';
import session from 'express-session';
import login from './login.js';

const app = new express();

app.use(
  session({
    secret: 'drink_order_system',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);

app.get('/', (req, res) => {
  if (req.session.logged) {
    res.redirect('/index.html');
  } else {
    res.redirect('/login.html');
  }
});

app.use('/auth', login);
app.use('/', express.static('static'));

app.listen(8080, () => {
  console.log(new Date().toLocaleString());
  console.log('Server started at http://127.0.0.1:8080');
});
