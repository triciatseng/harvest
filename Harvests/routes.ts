import * as express from 'express';
let jwt = require('express-jwt');
import * as controller from './controller';

const router = express.Router();
const auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

router.post('/', auth, controller.create);
router.delete('/:id', auth, controller.remove);
router.put('/:id', auth, controller.update);

export = router;
