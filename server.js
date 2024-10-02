const express = require("express");
const bodyParser = require("body-parser");
const index = require('./src/routes/index');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use("/", index); 

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
