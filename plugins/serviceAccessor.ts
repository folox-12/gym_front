import { Plugin } from '@nuxt/types';
import { initializeServices } from '~/utils/service';
import ActivitiesComplex from '~/services/ActivitiesComplex';
import Subscription from '~/services/SubscriptionService';
import Activity from '~/services/Acitvity';
import BodyPart from '~/services/BodyParts';
import Profile from '~/services/ProfileService';

const accessor: Plugin = (ctx) => {
    const {
        app: {
            $axios, i18n, router,
        },
    } = ctx;
    const complex = new ActivitiesComplex($axios);
    const subscription = new Subscription($axios);
    const activity = new Activity($axios);
    const bodyPart = new BodyPart($axios);
    const profile = new Profile($axios);

    const services = {
        i18n,
        router,
        $axios,
        complex,
        subscription,
        activity,
        bodyPart,
        profile,
    };

    initializeServices(services);
};

export default accessor;
