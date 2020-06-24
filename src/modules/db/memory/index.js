const redis = require("redis");

const { REDIS_URL, REDIS_PORT, REDIS_PASSWORD } = process.env;

const client = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  retry_strategy: () => 1000
});

if(client) {
  client.on('connect', () => console.log('[redis:connec]'))
  client.on('error', (err) => console.log(`[redis:error] ${err}`))
}
else 
  console.log('no redis');
  

const save = (key, value) => {  
  if(client) {
    const parsedValue = JSON.stringify(value)
    client.set(key, parsedValue, (err, response) => {
      if (err) console.log('[redis:save]: ', err);
      console.log('[redis:save]: ', response);
    })
  }
}

const findOne = async (id) => {
  if (client) {
    return new Promise((resolve, reject) =>{
      client.get(id, (err, response) => {
        if(err) return reject(err)
        resolve(JSON.parse(response))
      })
    })
  }
}

const remove = (id) => {
  if (client) {
    return new Promise((resolve, reject) => {
      client.del(id, (err, response) => {
        if (err) return reject(err)
        resolve(response)
      })
    })
  }

}
const update = () => {

}

module.exports = {
  save,
  findOne,
  remove,
  update,
}