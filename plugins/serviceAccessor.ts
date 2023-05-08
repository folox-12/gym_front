import { Plugin } from '@nuxt/types';
import { initializeServices } from '~/utils/service';
import ActivitiesComplex from '~/services/ActivitiesComplex';
import Subscription from '~/services/SubscriptionService';
import Activity from '~/services/Acitvity';
import BodyPart from '~/services/BodyParts';


const accessor: Plugin = (ctx) => {
    const {
        app: {
            $axios, i18n, router,
        },
    } = ctx;
    const complex = new ActivitiesComplex($axios);
    const subscription = new Subscription($axios)
    const activity = new Activity($axios)
    const bodyPart = new BodyPart($axios)

    const services = {
        i18n,
        router,
        $axios,
        complex,
        subscription,
        activity,
        bodyPart,
    };

    initializeServices(services);
};

export default accessor;
