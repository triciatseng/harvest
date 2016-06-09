import * as express from 'express';
// import * as jwt from ('express-jwt');
let jwt = require('express-jwt');
import * as controller from './controller';

const router = express.Router();
const auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

router.get('/user/:id', auth, controller.getAll);
router.get('/:id', auth, controller.getOne);
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

export = router;
