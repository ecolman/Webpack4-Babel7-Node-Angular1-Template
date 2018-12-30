import { find, reverse } from 'lodash';

export function routerDecorator($transitions) {
  'ngInject';

  // redirect to login if route requires auth and the user is not logged in, or doesn't have required role
  $transitions.onBefore({ to: state => find(state.path, s => s.authenticate) },
    transition => {
      const paths = [].concat(transition.$to().path);
      const authenticateState = find(reverse(paths), p => p.authenticate); // reverse to get inner most state authenticate prop
      let newState = null;

      if (authenticateState) {
      // const authenticate = authenticateState.authenticate;

        // if (typeof authenticate === 'string') {
        //   let has = await Auth.hasRole(authenticate);

        //   if (!has) {
        //     let is = await Auth.isLoggedIn();

        //     newState = is.length > 0 ? 'main' : 'login';
        //   }
        // } else {
        //   let is = await Auth.isLoggedIn();

      //   if (!is) {
      //     newState = 'login';
      //   }
      // }
      }

      if (newState) {
        return transition.router.stateService.target(newState);
      }
    });
}
