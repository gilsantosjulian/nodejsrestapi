import Joi from 'joi';

export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
export default {
  createPost: {
    body: {
      title: Joi.string().min(3).required(),
      text: Joi.string().min(10).required(),
    },
  },
  updatePost: {
    body: {
      title: Joi.string().min(3),
      text: Joi.string().min(10),
    },
  },
};