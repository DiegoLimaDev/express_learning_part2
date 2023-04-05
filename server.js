const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');

const whitelist = ['http://localhost:8000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/subdir', require('./routes/subdir'));

app.use('/', require('./routes/root'));

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

// chaining route handlers
const one = (req, res, next) => {
  console.log('one');
  next();
};

const two = (req, res, next) => {
  console.log('two');
  next();
};

const three = (req, res) => {
  console.log('three');
  res.send('Finished!');
};

app.get('/chain(.html)?', [one, two, three]);

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
