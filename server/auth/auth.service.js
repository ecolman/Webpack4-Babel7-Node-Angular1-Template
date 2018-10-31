import { config } from '../config';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use((req, res, next) => {
      if (config.isProd) {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = `Bearer ${req.query.access_token}`;
        }

        // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
        if (req.query && typeof req.headers.authorization === 'undefined') {
          req.headers.authorization = `Bearer ${req.cookies.token}`;
        }

        validateJwt(req, res, next);
      } else {
        return next();
      }
    })
    .use((req, res, next) => {
      if (config.isProd) {
        // validateJwt will put our properties into req.user object if it's a valid token
        // we only set id and roles in token, so check that ids match with stored session user
        // and then set req.user
        if (req.user.id && req.session && req.session.user && req.user.id === req.session.user.id) {
          req.user = req.session.user;
        }
      } else {
        // check for development token existance
        if (req.headers.cookie && req.headers.cookie.indexOf('DEVELOPMENT-TOKEN') === -1) {
          let token = 'DEVELOPMENT-TOKEN';
          res.cookie('token', token);
        }

        req.user = {
          id: 1,
          firstName: 'Test',
          lastName: 'User',
          title: 'Developer'
        };
      }

      return next();
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(user) {
  let { id, roles } = user;

  return jwt.sign({ id, roles }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send({message: 'It looks like you aren\'t logged in, please try again.'});
  }
  var token = signToken(req.user);
  res.cookie('token', token);
  res.redirect('/');
}
