import dotenv from 'dotenv';

export default () => {
  const envFilePath = '.env';
  const loadEnv = dotenv.config({
    path: envFilePath
  });  
  if (loadEnv.error) {
    throw loadEnv.error;
  }
}