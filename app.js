const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Simulando una base de datos de usuarios
const users = {
  'admin': 'Admin1**',
  'user_test': 'Test1**',
};

// Rutas
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/landing');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    req.session.user = username;
    res.redirect('/landing');
  } else {
    res.render('login', { error: 'Usuario o contraseña incorrectos' });
  }
});

app.get('/landing', (req, res) => {
  if (req.session.user) {
    res.render('landing', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
