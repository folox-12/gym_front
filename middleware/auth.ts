import { Middleware } from '@nuxt/types';

// eslint-disable-next-line consistent-return
const authorizated: Middleware = async(context) => {
    const isAuth: boolean = context.$auth.loggedIn;
    const isAuthorizatedPage: boolean = context.route.path.includes('auth');

    if (isAuthorizatedPage) {
        if(isAuth){
            return context.redirect('/');
        }
    } else {
        if (!isAuth) {
            return context.redirect('/');
        } 
    }
};

export default authorizated;

