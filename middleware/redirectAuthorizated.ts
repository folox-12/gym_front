import { Middleware } from "@nuxt/types";

// eslint-disable-next-line consistent-return
const redirectAuthorizated: Middleware = async (context) => {
    const isAuth: boolean = context.$auth.loggedIn;

    if (isAuth) {
        return context.redirect("/");
    }
};
export default redirectAuthorizated;
