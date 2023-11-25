import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './modules/users/users.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//Application routes
app.use('/api', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hey!!!!!!!!!!!Welcome to mongoose');
});

export default app;
