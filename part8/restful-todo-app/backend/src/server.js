const app = require('./app');
const mongose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,}).
    then(() => {
        app.listen(PORT, () => {
            console.log('Connected to MongoDB');
            console.log(`Server running on port ${PORT}`);
        });
    }).catch(error => {
        console.log('error connecting to MongoDB:', error.message);
    });

