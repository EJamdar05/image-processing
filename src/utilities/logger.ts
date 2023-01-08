import express from 'express'
const logger = (req: express.Request, res: express.Response, next: Function)=>{
    let url = req.url;
    console.dir(`${url} was accessed by ${req.ip.slice(7)}`)
    next();
}

export default logger;