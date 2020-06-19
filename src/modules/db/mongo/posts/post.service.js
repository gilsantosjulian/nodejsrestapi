import PostSchema from './post.model';
import redisMem from '../../memory/index';

const create = async (args, user) => {
  const postCreated = await PostSchema.create({...args, user})
  redisMem.save(postCreated._id.toString(), {...postCreated})
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

module.exports = {
  create,
  getById,
}