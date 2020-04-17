const express = require('express');
const connectDB = require('./config/connectDB');
const app = express();
const cors = require('cors');
const user = require('./routes/user');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
app.use(cors())
connectDB();

app.use(express.json());

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/profile', profile)


app.listen(5000, ()=> {
    console.log('app run on port 5000');
})