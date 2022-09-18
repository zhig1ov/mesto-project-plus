import { Schema, model, ObjectId } from 'mongoose';

export interface ICards {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Card = model<ICards>('card', cardSchema);

export { Card };
