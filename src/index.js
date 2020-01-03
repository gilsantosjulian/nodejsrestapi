import express from 'express';
import constants from '../config/constants';
import '../config/database';
import middlewareConfig from '../config/middleware';
const app = express(); //passing the app instance to middlewareConfig 

middlewareConfig(app);
app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Server running on port: ${constants.PORT} --- Running on ${process.env.NODE_ENV} --- Make something great.!`)
  }
});