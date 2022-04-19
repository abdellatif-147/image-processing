import express from 'express';
import router from './routes/imgProcessing';

const app = express();
const port = 3000;

app.use('/', router);
app.listen(port, () => {
  console.log(`server starting on http://localhost:${port}`);
});

export default app;
