import express from 'express'
import logger from '../../utilities/logger'
const students = express.Router();

// students.get('/', (req, res)=>{
//     res.send(`Student route`)
// });

students.get('/', logger, function(req, res){
    res.send(`Student route`)
})

export default students;