const mongoose = require('mongoose')

const FrontSchema = mongoose.Schema({
    filename:{
        type:String,
    },
    size:{
        type:String,
    },
    path:String,
    uId:String,
    sender:String,
    reciever:String,
},{
    timestamps:true,
})

const HomeModel = mongoose.model('Files',FrontSchema);
module.exports = HomeModel