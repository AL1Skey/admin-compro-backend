import express from 'express';
import routes from './v1/routes/routes';
import { configDotenv } from 'dotenv';
const app = express();
const port = 3000;

configDotenv();

app.get('/api/v1', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/v1",routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;