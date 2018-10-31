import { config } from './config';
import errors from './components/errors';
import path from 'path';
import lusca from 'lusca';
import * as auth from './auth/auth.service';

export default function(app) {
  // AUTH Routes

  // this turns on csrf token for all calls after it
  // only turned non-development envs
  if (config.isProd) {
    app.use(lusca.csrf({ angular: true }));
  }

  // no cache headers for API routes
  app.use('/api/*', (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
  });

  // API Routes
  app.use('/api/users', auth.isAuthenticated(), require('./api/user').router);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|samlauthn|components|app|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
