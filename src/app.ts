import express from 'express';
import mongoose from 'mongoose';
import {getUsers} from './controllers/user';
import userRouter from './routes/user';
import cardRouter from './routes/card';

const { PORT = 3000, BASE_PATH = "none" } = process.env;
const app = express();


app.use(
  express.urlencoded({ extended: true })
);

app.use(express.json());


app.use('/', userRouter);
app.use('/', cardRouter);

app.use((req, res, next) => {
  (req as any).user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    app.listen(PORT, () => {
      console.log(`server started ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

