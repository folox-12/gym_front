import { Middleware } from '@nuxt/types';
import { useActivitiesComplex } from '~/pinia-store/ActivitiesComplexStore';

const isUserAuthorComplex: Middleware = async(context) => {
    const { $pinia, $auth, app } = context;
    const idComplex = app.router!.currentRoute.params.id;
    const { isUserAuthorFetch } = useActivitiesComplex($pinia);

    if ($auth.user?.id) {
        const { data, error } = await isUserAuthorFetch(idComplex);

        if (!data || error) {
            return context.redirect('/');
        }
    }
};

export default isUserAuthorComplex;
