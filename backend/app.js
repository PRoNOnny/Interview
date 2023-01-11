const express = require('express')
const connectDB = require('./config/db.js')
const app = express()
const port = 3000
const cors = require('cors');
const expressApp = express();
expressApp.use(cors({
    origin: ['http://localhost:4200'],
    "methods": "GET,PUT,POST",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true
}));

connectDB();

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json({ extended: false }))

app.get("/url", (req, res) => {
    var url = req.headers.url
    if (url) {
        console.log('request short url');
        
        res.status(200).json({ status: true, url: "rrreefsdf.df" })
    } else {
        console.log('request short url');
        res.status(400).json({ status: false })
    }
})

app.get("/member", (req, res) => {
    console.log('request member');
    res.status(200).json({ status: true })
})

app.get("/department", (req, res) => {
    console.log('request department');
    res.status(200).json({ status: true })
})

app.get("/branch", (req, res) => {
    console.log('request branch');
    res.status(200).json({ status: true })
})


app.listen(port, () => {
})

