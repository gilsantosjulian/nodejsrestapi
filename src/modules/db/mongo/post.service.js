import PostSchema from './posts/post.model';
import redisMem from '../../db/memory/index';

const create = async (args, user) => {
  const postCreated = await PostSchema.create({...args, user});
  redisMem.save(postCreated._id.toString(), {...postCreated})
  return postCreated
}

module.exports = {
  create
}