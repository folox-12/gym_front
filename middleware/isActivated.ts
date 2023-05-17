import { Middleware } from '@nuxt/types';

const isActivated: Middleware = async(context) => {
    const { $auth } = context;

    if ($auth.loggedIn && $auth.user?.isActivated) {
        context.redirect('/tranings');
    }
};

export default isActivated;
