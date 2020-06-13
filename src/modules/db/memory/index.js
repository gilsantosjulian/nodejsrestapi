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
  if(client)
    client.set(key, value, (err, response) => {
      if (err) console.log('err: ', err);
      console.log('response: ', response);
      
    })
}

const findOne = () => {

}

const remove = () => {

}
const update = () => {

}

module.exports = {
  save,
  findOne,
  remove,
  update,
}