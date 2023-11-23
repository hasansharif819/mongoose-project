import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { StudentRoute } from './modules/students/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//Application routes
app.use('/users');

app.get('/', (req: Request, res: Response) => {
  res.send('Hey!!!!!!Welcome to mongoose project');
});

export default app;
