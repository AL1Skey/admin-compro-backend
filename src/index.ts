import express from 'express';
import routes from './v1/routes/routes';
import { configDotenv } from 'dotenv';
import cors from 'cors';
const app = express();
const port = 3655;

configDotenv();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get('/api/v1', (req, res) => {
  res.send('Hello World! V1');
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/v1",routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;