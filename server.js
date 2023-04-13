const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');

app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.use(cors(require('./config/corsOptions')));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/employees', require('./routes/api/employees'));

// Route handlers
app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
  },
  (req, res) => {
    res.send('Hello World!');
  },
);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ succes: false, message: 'Page not found', error: 404 });
  } else {
    res.type('txt').send('Page not found\t404 error');
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
