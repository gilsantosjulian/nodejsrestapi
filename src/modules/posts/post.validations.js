import Joi from 'joi';

export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
export default {
  createPost: {
    body: {
      title: Joi.string().required(),
      text: Joi.string().required(),
    },
  },
};