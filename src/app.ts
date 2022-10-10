import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import userRouter from './routes/user';
import cardRouter from './routes/card';
import authRouter from './routes/auth';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import authValidator from './validators/authValidator';

interface Error {
  statusCode: number,
  message: string,
}

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

app.use(errorLogger);
app.use(errors());
app.use((
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

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
