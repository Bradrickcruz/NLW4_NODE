import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

app.listen(3333, () => {
  console.log('Running on 3333 PORT');
});
