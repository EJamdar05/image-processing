import express from 'express';
import logger from '../../utilities/logger';
import fs = require('fs');
import path = require('path');
import sharp = require('sharp');
const images = express.Router();
images.get('/', logger, (req, res): void => {
    const fileName = req.query.filename as string; //filename parameter
    const width = req.query.width as string; //width parameter
    const height = req.query.height as string; //height parameter

    if (fileName && width && height) {
        //if all the fields contain values, then proceed
        const fileArr: string[] = fileName.split('.'); //spliting needed to rename the file
        const thumbFilePath: string = //thumbFilePath: path str that leads to public/assets/thumb (which holds resized images)
            '../../../public/assets/thumb/' + //thumbnail filename ex: profile_thumb_20x20.jpg
            fileArr[0] + //fileName
            '_thumb_' +
            width +
            'x' +
            height +
            '.' +
            fileArr[1]; //file extension
        const resizedPath: string = path.join(__dirname, thumbFilePath); //getting relative path to current dir for thumbs

        //if the file exists, simply serve the content
        if (fs.existsSync(resizedPath)) {
            res.sendFile(resizedPath);
        } else {
            try {
                resizeImage(
                    fileName,
                    parseInt(width),
                    parseInt(height),
                    thumbFilePath,
                ); //resizeImage deals with sharp logic
                res.sendFile(resizedPath);
            } catch (error) {
                res.send(error);
            }
        }
    } else {
        //line is executed when parameters to url are invalid
        res.send(
            'Error: No image input was given or the parameters (width and height) are missing.',
        );
    }
});

export const resizeImage = async (
    fileName: string,
    width: number,
    height: number,
    result: string,
): Promise<void> => {
    try {
        const fullSizePath: string = '../../../public/assets/full/' + fileName; //getting the fullsized image path
        await sharp(path.join(__dirname, fullSizePath)) //await req for resizing image via sharp module and making new file
            .resize({
                width: width,
                height: height,
            })
            .toFile(path.join(__dirname, result));
    } catch (error) {
        console.log(error);
    }
};

export default images;
(module.exports = images), resizeImage;
