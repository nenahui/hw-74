import express from 'express';
import messagesRouter from './routers/messages';

const app = express();
const port = 8001;

app.use(express.json());
app.use('/messages', messagesRouter);

const run = () => {
  app.listen(port, () => {
    console.log(`Server stared on port ${port}`);
  });
};

run();