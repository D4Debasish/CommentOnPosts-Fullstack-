require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/dbConn.js');
const mongoose = require('mongoose');
const path = require('path');
console.log(process.env.HELLO_TEST, process.env.PORT);
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions.js');
const postRoute = require('./routes/postRoute.js');
const userRoute = require('./routes/userRoute.js');
const rootRoute = require('./routes/root.js');
const authRoute = require('./routes/authRoutes.js');

const app = express();

app.use(cors(corsOptions));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 413 && 'body' in err) {
    return res.status(413).json({ message: 'Request entity too large' });
  }
  next();
});
connectDB();
const PORT = process.env.PORT || 6969;

app.use(express.json({ limit: '16mb' }));
app.use(cookieParser());

app.use('/', rootRoute);
app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: 'Not found' });
  } else {
    res.type('txt').send('Not found');
  }
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(`Error connecting to MongoDB: ${err}`);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  );
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});
