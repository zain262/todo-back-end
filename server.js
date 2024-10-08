const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./routers/userRouter');
const todoRouter = require('./routers/todoRouter');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const DB =
  'mongodb+srv://Zain262:DFmwEFTe5!LhLGb@cluster0.wetna.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTION SUCCESSFUL');
  })
  .catch((err) => {
    console.error('DB CONNECTION ERROR:', err);
  });

// Sample route
app.get('/', (req, res, next) => {
  res.json({
    message: 'hello',
  });
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', todoRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`APP IS RUNNING on port ${port}`);
});
