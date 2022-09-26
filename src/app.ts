import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import userRouter from './routes/user';
import cardRouter from './routes/card';
import authRouter from './routes/auth';
import handleErrors from './middlewares/handleErrors';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import authValidator from './validators/authValidator';

const { PORT = 3000 } = process.env;
const app = express();

app.use(
  express.urlencoded({ extended: true }),
);

app.use(express.json());
app.use(requestLogger);

app.use('', authRouter);

app.use(authValidator(), auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(handleErrors);
app.use(errorLogger);
app.use(errors());

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    app.listen(PORT, () => {
      console.log(`server started ${PORT}`); // eslint-disable-line
    });
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
};

start();
