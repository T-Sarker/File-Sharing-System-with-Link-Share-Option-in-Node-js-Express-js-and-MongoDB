const mongoose = require('mongoose');

exports.db = async ()=>{
    await mongoose.connect('mongodb://localhost:27017/fshare', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },(err,rez)=>{
        if (err) {
            console.log("Connection couldn't be stublished");
        } else {
            console.log("Database connected");
        }
    })
}