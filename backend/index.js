const express = require("express")
const {v4:uuidv4} = require("uuid")
const cors = require("cors")

//express setup
const HTTP_PORT = 3000
app = express()

app.use(express.json())
app.use(cors())

app.listen(HTTP_PORT,err=>{
    if(err){
        console.error("ERROR:   Could not start server"+err)
    }else{
        console.log("SUCCESS:   Started server and listening")
    }
})