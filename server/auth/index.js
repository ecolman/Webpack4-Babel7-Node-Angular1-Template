import express from 'express';
import { config } from '../config';

let User = {};

// Passport Configuration
require('./local/passport').setup(User, config);

let router = express.Router();

router.use('/', require('./saml').router);

export { router };
