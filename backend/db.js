const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2"
mongoose.set('strictQuery', false);
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, (err)=>{
        if(err) console.log(err)
        else console.log("Connected to Mongo Successfully")
    })
}

module.exports = connectToMongo;