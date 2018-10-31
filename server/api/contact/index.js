import { Router } from 'express';
import * as controller from './contact.controller';
import * as auth from '../../auth/auth.service';

let router = new Router({
  mergeParams: true
});

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:id', auth.isAuthenticated(), controller.upsert);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.get('/search/:text', auth.isAuthenticated(), controller.searchByNameOrEmail);

export { router };
