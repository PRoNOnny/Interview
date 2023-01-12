const express = require('express')
const connectDB = require('./config/db.js')
const urlSchema = require('./models/Url.js')
const fn = require('./service/service.js')
const config = require('./config/default.json')
const urlDB = require('./models/Url.js')
const baseUrl = config.baseUrl
const port = config.port
const app = express()
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
        var shortUrl = ''
        var longUrl = urlDB.findlongUrl(url, (result) => {
            if (result.length > 0) {
                res.status(200).json({ status: true, url: baseUrl + '/b/' + result[0].shortUrl })
            } else {
                longUrl = url
                shortUrl = fn.shortIdGenerate()

                data = new urlSchema({
                    longUrl: longUrl,
                    shortUrl: shortUrl
                })

                connectDB.addNewData(data, (result) => {
                    res.status(200).json({ status: true, url: baseUrl + '/b/' + result.shortUrl })
                })
            }
        })

    } else {
        console.log('Invalid short url');
        res.status(401).json({ status: false })
    }
})

app.use('/b/', require('./routes/redirect'));

// app.get("/member", (req, res) => {
//     console.log('request member');
//     res.status(200).json({ status: true })
// })

// app.get("/department", (req, res) => {
//     console.log('request department');
//     res.status(200).json({ status: true })
// })

// app.get("/branch", (req, res) => {
//     console.log('request branch');
//     res.status(200).json({ status: true })
// })

app.listen(port, () => {
    console.log(`Server run on port ${port}`);
})

