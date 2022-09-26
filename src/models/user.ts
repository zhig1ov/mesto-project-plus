import { Schema, model } from 'mongoose';
import { urlValidator } from '../helpers';
import { DEFAULT_USER_NAME, DEFAULT_USER_ABOUT, DEFAULT_USER_AVATAR } from '../types/constants';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER_NAME,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    default: DEFAULT_USER_ABOUT,
  },
  avatar: {
    type: String,
    default: DEFAULT_USER_AVATAR,
    validate: {
      validator: urlValidator,
      message: 'Поле avatar должно быть ссылкой.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const User = model<IUser>('user', userSchema);

export { User };
