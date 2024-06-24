import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import db from './config/database';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://orders-backend-mrjgh.ondigitalocean.app',
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;


app.use('/api', routes);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

app.use('/', (_req, res) => {
  res.json({ message: 'Cruce challenge.' });
});

if (process.env.NODE_ENV !== 'test') {
  db.sync({ force: false })
    .then(() => {
      const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      if (process.env.NODE_ENV === 'test') {
        global.server = server;
      }
    })
    .catch((error) => console.error(error));
}

export default app;