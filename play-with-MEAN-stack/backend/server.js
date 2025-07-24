

console.log('Server is starting...');

const express = require('express');
const fs = require('fs');
const logger = require('./middlewares/logger');
const todosRouter = require('./routes/todos');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));
app.use(logger)
app.use(express.static('public'));
app.use('/api/todos', todosRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});