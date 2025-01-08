const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todosRoutes');
const loadEnv = require('./config/env');
const connectDB = require('./config/db');


loadEnv();

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use(require('./middleware/loggerMiddleware').logger);


app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use(require('./middleware/errorMiddleware').notFound);
app.use(require('./middleware/errorMiddleware').errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));