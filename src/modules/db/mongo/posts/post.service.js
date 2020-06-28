import PostSchema from './post.model';
import redisMem from '../../memory/index';

const create = async (args, user) => {
  const postCreated = await PostSchema.create({...args, user})
  redisMem.save(postCreated._id.toString(), { postCreated })
  return postCreated
}

const getById = async (id) => {
  const memPost = await redisMem.findOne(id)
  if (memPost){
    console.log('[redis:getById]: reading from redis');
    return memPost
  }
  
  const post = await PostSchema.findById(id).populate('user')
  if(!post) return null
  redisMem.save(post._id.toString(), {...post.toJSON()})
  console.log('[redis:getById]: reading from db');
  return post.toJSON()
}

const remove = async (id) => {  
  const post = await PostSchema.findById(id)
  if(!post) {
    console.log('[redis:remove]: not found in db');
    return null
  }
  const postRemoved = await post.remove()
  console.log('[redis:remove]: removing from db');

  if (!postRemoved) {
    console.log('[redis:remove]: not found in redis');
    return null
  }

  const memPost = await redisMem.remove(id)
  console.log('[redis:remove]: removing from redis');
  return memPost
}

module.exports = {
  create,
  getById,
  remove,
}