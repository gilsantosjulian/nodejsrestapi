import { Router } from 'express';
import { facebookAuth } from '../../services/auth.services';

const routes = new Router();

routes.get("/auth", facebookAuth)

routes.get("/auth/callback", facebookAuth, (req, res) => {
  console.log("req", req.user);
  res.render("/", {
    user: req.user,
  })
})

export default routes;