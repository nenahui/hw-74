import express from 'express';
import { promises as fs } from 'fs';
import type { Message } from '../types';

const messagesRouter = express.Router();
const messagesPath = './messages';

messagesRouter.get('/', async (req, res) => {
  try {
    const messages: Message[] = [];
    const files = await fs.readdir(messagesPath);
    
    for (const file of files) {
      const fileContents = await fs.readFile(`./messages/${file}`);
      const result = JSON.parse(fileContents.toString()) as Message;
      messages.push(result);
    }
    return res.status(200).send(messages.slice(-5));
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

messagesRouter.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (Object.keys(req.body).join('') !== 'message' || message === '') {
      return res.status(400).send('Invalid data!');
    }
    
    const newMessage: Message = {
      message,
      datetime: new Date().toISOString(),
    };

    const filePath = `${messagesPath}/${newMessage.datetime}.txt`;

    await fs.writeFile(filePath, JSON.stringify(newMessage));
    return res.status(201).send(newMessage);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

export default messagesRouter;
