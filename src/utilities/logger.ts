import express from 'express';
const logger = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): void => {
    const url = req.url;
    console.dir(`${url} was accessed by ${req.ip.slice(7)}`);
    next();
};

export default logger;
