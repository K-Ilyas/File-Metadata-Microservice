const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

// config env variables
dotenv.config();

// config cors
app.use(cors({ optionsSuccessStatus: 200 }));

// config static assets
app.use("/public", express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public/files"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single("upfile");


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.post("/api/fileanalyse", (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.json({ error: "something went wrong" })
        } else if (err) {
            // An unknown error occurred when uploading.
            res.json({ error: "something went wrong" })
        }
        // Everything went fine.  
        res.json({ "name": req.file.filename, "type": req.file.mimetype, "size": req.file.size });

    })
})



app.listen(port, () => {
    console.log(`app listening on port : ${port}`);
});



