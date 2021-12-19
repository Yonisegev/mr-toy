import { userService } from '../../services/userService';

export function onLogin(creds) {
    return async (dispatch) => {
        try {
            const user = await userService.login(creds);
            dispatch({
                type: 'SET_USER',
                user
            });
            return user;
        } catch (err) {
            console.log('Failed to log in');
            // TODO: Handle error
        }
    };
}

export function onSignup(creds) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(creds);
            dispatch({
                type: 'SET_USER',
                user
            });
            return user;
        } catch (err) {
            console.log('Failed to signup');
            // TODO: Handle error
        }
    };
}