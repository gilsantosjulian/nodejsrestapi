import HTTPStatus from 'http-status';
import Post from '../db/mongo/posts/post.model';
import { create } from '../db/mongo/post.service';
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
      User.findById(req.user._id),
      Post.findById(req.params.id).populate('user')
    ]);

    const favorite = promise[0]._favorites.isPostIsFavorite(req.params.id);
    const post = promise[1];

    return res.status(HTTPStatus.OK).json({
      ...post.toJSON(),
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
      Post.list({
        limit,
        skip
      })
    ]);

    const posts = promise[1].reduce((arr, post) => {
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
    const post = await Post.findById(req.params.id);
    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });
    return res.status(HTTPStatus.OK).json(await post.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    await post.remove();
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
