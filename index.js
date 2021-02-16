const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
var morgan = require('morgan');
const intersectionRouter = require('./routes/intersections');
const authRouter = require('./routes/auth');
const errorHandler = require('./middleware/error-handler');
const { NotFoundError } = require('./errors/error');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a',
  }
);
const app = express();
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(
  morgan(':remote-addr :method :url :status - :response-time ms', {
    stream: accessLogStream,
  })
);
app.use('/auth', authRouter);
app.use('/intersections', intersectionRouter);
app.use('*', () => {
  throw new NotFoundError('Invalid URL');
});
app.use(errorHandler);
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
