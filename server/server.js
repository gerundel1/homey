const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const uri = process.env.MONGODB_CONNECTION_STR;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
                console.log(`connected to mongoDB database`)
        })
        .catch(err => console.log(`Error occured when connecting to database${err}`))

const userRouter = require('./routes/user.route');
const productRouter = require('./routes/product.route');

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors());

app.use('/api', userRouter);
app.use('/api', productRouter);

app.listen(HTTP_PORT, () => { console.log("Ready to handle requests on port " + HTTP_PORT) });
