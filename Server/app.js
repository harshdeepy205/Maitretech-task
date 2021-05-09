const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const PORT = 5000
const { MONGOURI } = require('./keys')


// app.use(cors())

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb");
})

mongoose.connection.on("error", () => {
    console.log("connection error");
})

require('./model/user')

app.use(express.json())
app.use(require('./routes/auth'))


app.listen(PORT, () => {
    console.log("server start at ", PORT)
})

