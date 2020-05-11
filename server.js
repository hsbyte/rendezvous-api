/* eslint-disable prettier/prettier */
/* eslint-env es6 */
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connection established successfully'))

const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/users');

app.use('/api', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
