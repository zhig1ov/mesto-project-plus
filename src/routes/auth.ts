import { Router } from 'express';
import { createUser, login } from '../controllers/user';
import signupLoginValidator from '../validators/signupLoginValidator';

const authRouter = Router();

authRouter.post('/signin', signupLoginValidator(), login);
authRouter.post('/signup', signupLoginValidator(), createUser);

export default authRouter;
