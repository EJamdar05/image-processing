import express from 'express'
import logger from '../../utilities/logger'
const fs = require('fs')
let path = require("path");
const sharp = require('sharp');
const images = express.Router();
images.get('/', logger, (req, res)=>{
    const fileName = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.height as string;

    const fileArr: String[] = fileName.split('.')
    const thumbFileName: string = `../../../public/assets/thumb/${fileArr[0]}_thumb_${width}x${height}.${fileArr[1]}`
    const thumbnailPath = path.join(__dirname, `../../../public/assets/full/${fileName}`)

    if(fs.existsSync(thumbnailPath)){
        res.sendFile(thumbnailPath)
    }
    else if(fileName && width && height){
        resizeImage(fileName, parseInt(width), parseInt(height), thumbFileName)
        res.sendFile(thumbnailPath);
    }else{
        res.send("Error: No image input was given or the parameters (width and height) are missing.")
    }
});

async function resizeImage(fileName:String, width: number, height: number, result:String) {
    try {
        const fullSizePath = `../../../public/assets/full/${fileName}`
      await sharp(path.join(__dirname, fullSizePath)) 
        .resize({
          width: width,
          height: height
        })
        .toFile(path.join(__dirname, result))
    } catch (error) {
      console.log(error);
    }
  }



export default images;

