const express = require('express');
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');                              //Pour gere automatiquement les cookies
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const morgan = require('morgan');                                           //Pour suivre les activites du server

dbConnect();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Le server est fonctionnel sur le port ${PORT}`);
});