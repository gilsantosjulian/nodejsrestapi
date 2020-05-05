/* eslint-disable no-console */
import express from 'express';
import dotenv from "dotenv";
import exphbs from "express-handlebars";
import path from "path";
import constants from '../config/constants';
import '../config/database';
import middlewaresConfig from '../config/middleware';
import apiRoutes from './modules';

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
middlewaresConfig(app);
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.get('/login', (req, res) => {
  res.render('home');
});

apiRoutes(app);
app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(
      ` Server running on port: ${constants.PORT} --- Running on ${process.env.NODE_ENV} --- Make something great `,
    );
  }
});
