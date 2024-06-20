const express = require('express');
const router = require('./routes/route');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.APP_PORT


app.use(cors());
app.use(express.json());
app.use('/', router);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});