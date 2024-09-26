const mongoose = require("mongoose")

const conn = async(req, res)=>{
    try {
        await mongoose.connect("mongodb+srv://aryan:aryan@cluster0.ewiwy.mongodb.net/")
    }catch{
        console.log("Error")
    }
}

conn();