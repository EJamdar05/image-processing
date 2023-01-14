import express from 'express'
import logger from '../../utilities/logger'
let path = require("path");
const sharp = require('sharp');
const images = express.Router();
images.get('/', logger, (req, res)=>{
    const fileName = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.width as string;
    if(fileName){
        console.log(fileName)
        const fileArr: String[] = fileName.split('.')
        const thumbFileName: string = `assets/thumb/${fileArr[0]}_thumb.${fileArr[1]}`
        resizeImage(fileName, parseInt(width), parseInt(height), thumbFileName)
        res.sendFile(__dirname+"/"+thumbFileName);
    }else{
        res.send("Error: No image input was given.")
        console.log(fileName)
    }
});

async function resizeImage(fileName:String, width: number, height: number, result:String) {
    try {
        console.log(__dirname )
      await sharp(`${__dirname}/assets/full/${fileName}`, { root : __dirname}) 
        .resize({
          width: width,
          height: height
        })
        .toFile(`${__dirname}/${result}`)
    } catch (error) {
      console.log(error);
    }
  }



export default images;

