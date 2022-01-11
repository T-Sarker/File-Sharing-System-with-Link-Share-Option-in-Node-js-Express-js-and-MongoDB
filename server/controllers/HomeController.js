const FileModel = require('../models/Home')
const path = require('path')
const fs = require('fs')

exports.index = (req,res)=>{
    return res.render('index');
}

exports.share = (req,res)=>{
    return res.render('share',{
        status:null,
        errormsg:null,
        link:null
    }); 
}

exports.addImage = async(req,res)=>{
    if (req.file && (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg")) {
        console.log('mime type error');
        return res.render('share',{
            status:'failed',
            errormsg:"File type not supported! Only png,jpeg,jpg are supported.",
            link:null
        });
    }else{

        try {
            const data = await FileModel.create({
                'filename': req.file.filename,
                'size': req.file.size,
                'path': req.file.destination,
                'uId': (Math.random()*1e32).toString(36),
                'sender': null,
                'reciever': null
            })

            return res.render('share',{
                status:'success',
                errormsg:"File type not supported! Only png,jpeg,jpg are supported.",
                result:{
                    base:process.env.base_url,
                    data:data
                }
            });
        } catch (error) {
           return res.render('share',{
                status:'failed',
                errormsg:"File type not supported! Only png,jpeg,jpg are supported.",
                link:null
            });
        }
    }
}

exports.downloadpage = async (req,res)=>{
    try {
        const data = await FileModel.findOne({'uId':req.params.id});
        return res.render('download',{
            status:'success',
            errormsg:null,
            result:{
                base:process.env.base_url,
                data:data
            }
        })
    } catch (error) {
        console.log(error);
        return res.render('404')
    }
}

exports.downloadImage = async(req,res)=>{
    try {
        const data = await FileModel.findOne({'uId':req.params.uid});
        let dnldLink =process.env.base_url+'uploads'+'/'+data.filename
        fs.access(__dirname+'../../../public/uploads/'+data.filename, fs.F_OK, (err) => {
            if (err) {
                console.log(err);
                return res.status(200).send({'link':null,'name':null});
            } else {
                return res.status(200).send({'link':dnldLink,'name':data.filename});
            }
          })
        
    } catch (error) {
        console.log(error);
        return res.render('404',{'msg':'Image Link expired' })
    }
}