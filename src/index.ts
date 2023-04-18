import express, { Express, Request, Response } from 'express';
import { run, runGetUserWorkflow } from './client';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});


app.get('/start-workflow/:name', (req: Request, res: Response) => {
  run(req.params.name).then(val => {
    res.send(val);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
});

app.get('/user/:id', (req: Request, res: Response) => {
  runGetUserWorkflow(parseInt(req.params.id)).then(val => {
    res.send(val);
  }).catch((err) => {
    console.error(err);
    res.send(err.message);
    // process.exit(1);
  });
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
