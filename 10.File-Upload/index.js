const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const storage = require("./upload-config");

const path = require("path");
const fs = require("fs");
const app = express();

const router = new express.Router();
app.use(router);
app.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

const Storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 1000000 },
}).single("img");

router.post("/upload", upload, async (req, res) => {
  res.status(201).send("sucess");
});

app.listen(3333, () => {
  console.log("server on!");
});
