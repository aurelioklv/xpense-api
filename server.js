const env = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: `${__dirname}/.env.${env}`,
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sequelize, connectDb} = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middlewares/errorHandler');
const defineAssociations = require('./models/associations')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/api', (req, res) => {
    res.json({message: 'Welcome to Expense API'});
})

app.use('/api/expense', expenseRoutes);
app.use('/api/category', categoryRoutes);
app.use(errorHandler);

async function startServer() {
    console.log(`server.js Current env: ${env}`);
    console.log(`server.js Hello: ${process.env.HELLO}`);
    try {
        await connectDb();

        defineAssociations()

        await sequelize.sync({alter: true});
        console.log('Database synced successfully!');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}

startServer();