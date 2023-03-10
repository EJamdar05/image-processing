import express from 'express';
import routes from './routes/index';
const app = express();
const port = 3000;

app.use('/api', routes);

app.listen(port, (): void => {
    console.log(`Listening on port ${port}`);
});

app.get('/api', (req: express.Request, res: express.Response): void => {
    console.dir(req.protocol);
    res.send(`IP Address: ${req.ip}`);
});

export default { app };
module.exports = app;
