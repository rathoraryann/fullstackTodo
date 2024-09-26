const express = require("express")
const app = express()
const cors = require('cors')
const path = require('path')
require("./conn/conn")
const auth = require("./routes/auth")
const list = require("./routes/list")
app.use(express.json())
app.use(cors())

app.use("/api/v1", auth)
app.use("/api/v2", list)


app.get('/', (req, res)=>{
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})

app.listen(1000, ()=>{
    console.log("Server is running on port 1000")
})


// http://localhost:1000/