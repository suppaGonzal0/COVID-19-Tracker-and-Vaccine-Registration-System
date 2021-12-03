const express = require('express');
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const port= 3001;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });