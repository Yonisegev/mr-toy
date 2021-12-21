import { showErrorMsg, showSuccessMsg } from '../../services/eventBusService';
import { userService } from '../../services/userService';

export function onLogin(creds) {
  return async (dispatch) => {
    try {
      const user = await userService.login(creds);
      dispatch({
        type: 'SET_USER',
        user,
      });
      showSuccessMsg({ txt: `Welcome, ${user.fullname}!` });
      return user;
    } catch (err) {
      showErrorMsg({ txt: `Could not log in...` });
      throw err;
    }
  };
}

export function onSignup(creds) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(creds);
      dispatch({
        type: 'SET_USER',
        user,
      });
      return user;
    } catch (err) {
      throw err;
    }
  };
}

export function onLogout() {
  return async (dispatch) => {
    try {
      await userService.logout();
      dispatch({
        type: 'SET_USER',
        user: null,
      });
      showSuccessMsg({ txt: 'Bye bye!' });
    } catch (err) {
      console.log('Could not logout', err);
    }
  };
}
