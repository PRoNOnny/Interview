const express = require('express')
const app = express()
const port = 3000


app.use(express.static);

app.get('/member', (req, res) => {
    res.json([
        {

        }
    ])
    
})

app.listen(port, () => {

})

