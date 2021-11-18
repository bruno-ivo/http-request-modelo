const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOption = {
  origin: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));

const multipartMiddleware = multipart({ uploadDir: "./uploads" });

app.listen(8000, () => {
  console.log("Servidor porta 8000");
});
