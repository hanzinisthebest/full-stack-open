const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Initialize Express app
const app = express();

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers,
  context: ({ req }) => {
    // Extract token from headers
    const token = req.headers.authorization || '';
    let user = null;

    if (token) {
      try {
        // Verify JWT
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.error('Invalid token:', err.message);
      }
    }

    // Add user to context
    return { user };
  },
 });
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
