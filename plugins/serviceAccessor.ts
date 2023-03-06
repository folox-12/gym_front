import { Plugin } from '@nuxt/types';
import { initializeServices } from '~/utils/service';
import ActivitiesComplex from '~/services/ActivitiesComplex';
import Subscription from '~/services/SubscriptionService';


const accessor: Plugin = (ctx) => {
    const {
        app: {
            $axios, i18n, router,
        },
    } = ctx;
    const complex = new ActivitiesComplex($axios);
    const subscription = new Subscription($axios)

    const services = {
        i18n,
        router,
        $axios,
        complex,
        subscription,
    };

    initializeServices(services);
};

export default accessor;
