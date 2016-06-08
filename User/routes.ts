import * as express from 'express';
import {User, IUserModel} from './model';
let jwt = require('express-jwt');


const passport = require('passport');
const router = express.Router();
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

router.get('/auth/facebook', passport.authenticate('facebook',{session: false, scope:['email']}));
router.get('/auth/facebook/callback', passport.authenticate('facebook',{session: false}), (req,res,next) => {
  res.redirect('/?code=' + req['tempUser'].generateJWT());
});

export = router;
