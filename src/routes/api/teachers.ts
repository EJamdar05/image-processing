import express from 'express'
import logger from '../../utilities/logger'
let path = require("path")
const teachers = express.Router();
teachers.get('/cover.jpg', logger, (req, res)=>{
    console.log("Serving the image")
    res.sendFile(path.join(__dirname, '', 'cd_dil_cover.jpg'));
});

export default teachers;