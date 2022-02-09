const express = require('express');
const expressLayouts = require('express-ejs-layouts');


const router = require('./routes')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// app.use(expressLayouts);
// app.set('layout', './layouts/layout')

app


app.use(router);

app.listen(5000, () => console.log("server is listening to port 5000"));