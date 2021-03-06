import PostSchema from './post.model';
import redisMem from '../../memory/index';

const create = async (args, user) => {
  const postCreated = await PostSchema.create({...args, user})
  redisMem.save(postCreated._id.toString(), postCreated)
  return postCreated
}

const getAll = async (limit=50, skip=0) => {
  return PostSchema.find()
  .sort({createdAt: -1})
  .skip(skip)
  .skip(limit)
  .populate('user')
}

const getById = async (id) => {
  const memPost = await redisMem.findOne(id)
  if (memPost){
    console.log('[redis:getById]: reading from redis');
    return memPost
  }

  if (!memPost) {
    console.log('[redis:remove]: not found in redis');
    return null
  }
  
  const post = await PostSchema.findById(id).populate('user')
  if (!post) {
    console.log('[redis:remove]: not found in db');
    return null
  }

  redisMem.save(post._id.toString(), {...post.toJSON()})
  console.log('[redis:getById]: reading from db');
  return post.toJSON()
}

const remove = async (id) => {  
  const post = await PostSchema.findById(id)
  const postRemoved = await post.remove()
  console.log('[redis:remove]: removing from db');

  if (postRemoved) {
    const memPost = await redisMem.remove(id)
    console.log('[redis:remove]: removing from redis');
    return memPost
  }
}

export const update = async (id, data) => {
  const post = await PostSchema.findById(id)
  Object.keys(data).forEach(key => {
    post[key] = data[key];
  });
  
  const postUpdated = await post.save()
  await redisMem.findOne(id);
  await redisMem.save(id, postUpdated);
  return postUpdated
}

module.exports = {
  create,
  getById,
  remove,
  update,
  getAll,
}