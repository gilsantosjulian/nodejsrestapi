import HTTPStatus from 'http-status';
import { create, getAll, getById, remove, update } from '../db/mongo/posts/post.service';
import User from '../users/user.model';

export const createPost = async (req, res) => {
  try {
    const post = await create(req.body, req.user._id);
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

export const getPostById = async (req, res) => {  
  try {
    const promise = await Promise.all([
      User.findById(req.user._id)
    ]);

    const favorite = promise[0]._favorites.isPostIsFavorite(req.params.id);
    const post = await getById(req.params.id)

    if (!post)
      return res.sendStatus(HTTPStatus.NOT_FOUND);

    return res.status(HTTPStatus.OK).json({
      ...post,
      favorite
    });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export const getPostsList = async (req, res) => {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
    ]);

    let posts = await getAll(limit, skip);
    posts = posts.reduce((arr, post) => {
      const favorite = promise[0]._favorites.isPostIsFavorite(post._id);

      arr.push({
        ...post.toJSON(),
        favorite
      });

      return arr;
    }, []);

    return res.status(HTTPStatus.OK).json(posts);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id.toString()
    const post = await getById(req.params.id)
    if (!post)
      return res.sendStatus(HTTPStatus.NOT_FOUND);

    if (post.user !== userId)       
    return res.sendStatus(HTTPStatus.UNAUTHORIZED);

    const postEdited = await update(postId, req.body);
    return res.status(HTTPStatus.OK).json(postEdited);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await getById(req.params.id)
    if (!post)
      return res.sendStatus(HTTPStatus.NOT_FOUND);

    const userId = req.user._id.toString()
    if (post.user !== userId) 
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    
    await remove(post._id);
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

export const favoritePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    await user._favorites.posts(req.params.id);
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
