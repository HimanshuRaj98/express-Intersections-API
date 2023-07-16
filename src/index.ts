import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { LineCheckContext, UserContext } from './context';
import morgan, { token } from 'morgan';
import { GeoJSONRouter, UserRouter } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// PayloadTooLargeError
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use(morgan('combined'))

LineCheckContext()
UserContext()

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is Up!');
});

app.use('/api/v1', GeoJSONRouter)
app.use('/auth', UserRouter)

app.listen(port, () => {
  console.log(` [server]: Server is running at http://localhost:${port}`);  
});