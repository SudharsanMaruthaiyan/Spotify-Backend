import {v2 as cloudinary} from 'cloudinary'
import albumModel from '../models/albumModel.js'
import mongoose from 'mongoose';

const addAlbum = async(req,res) =>{
    try{ 
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColour = req.body.bgColour;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});

        const albumData = {
            name,
            desc,
            bgColour,
            image:imageUpload.secure_url
        }

        const album = albumModel(albumData);
        await album.save()

        res.json({sucess: true , message:"Album Added"})
        console.log(albumData)
    }
    catch(error){
        res.json({sucess: false})
    }
}

const listAlbum = async(req,res)=>{
    try{
        const allAlbum = await albumModel.find({})
        res.json({success: true , Album: allAlbum})
    }
    catch(error){
        res.json({success: false})
    }
}

const removeAlbum = async(req,res)=>{
    try{
        const remove = await albumModel.findByIdAndDelete(req.body.id);
        res.json({success:true , message:"ablum removed"})
    }
    catch(error){
        res.json({success:false})
    }
}   

export {addAlbum,listAlbum,removeAlbum} 