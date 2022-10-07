import { celebrate, Joi, Segments } from 'celebrate';
import { linkRegex } from '../types/constants';

export default () => celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegex),
  }),
});
