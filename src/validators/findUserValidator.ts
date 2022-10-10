import { celebrate, Joi, Segments } from 'celebrate';

export default () => celebrate({
  [Segments.PARAMS]: Joi.object().keys({
  userId: Joi.string().length(24).hex(),
  })
});
