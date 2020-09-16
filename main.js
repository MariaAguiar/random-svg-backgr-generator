const express = require('express');
const app = express();
var mime = require('mime-types');

app.use(express.static('/home/margarida/Desktop/ColorWell/ColorWell'));
app.listen(3000);
