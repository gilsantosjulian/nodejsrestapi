import { Router } from 'express';
import validate from 'express-validation';
import * as postController from './post.controllers';
import { authJwt } from '../../services/auth.services';
import postValidation from './post.validations';

const routes = new Router();

routes.get('/', authJwt, postController.getPostsList);

routes.post(
  '/',
  authJwt,
  validate(postValidation.createPost),
  postController.createPost,
);

routes.get('/:id', authJwt, postController.getPostById);

routes.patch(
  '/:id',
  authJwt,
  validate(postValidation.updatePost),
  postController.updatePost,
);

routes.delete('/:id', authJwt, postController.deletePost);

routes.post('/:id/favorite', authJwt, postController.favoritePost);

export default routes;
