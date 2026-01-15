const express = require('express')
const cors = require('cors')    
const http = require("http");
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
server=http.createServer(app)

app.get("/", (req, res) => {
    res.send("API is working fine")
         })

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})