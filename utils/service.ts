import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueRouter from 'vue-router';
import VueI18n, { IVueI18n } from 'vue-i18n';
import { Auth } from '@nuxtjs/auth-next';
import ActivitiesComplex from '~/services/ActivitiesComplex';
import Subscription from '~/services/SubscriptionService';
import Activity from '~/services/Acitvity';
import BodyPart from '~/services/BodyParts';
import Profile from '~/services/ProfileService';
import CurrentTraning from '~/services/CurrentTraningsService';

type Services = {
    i18n: VueI18n & IVueI18n;
    router: VueRouter | undefined;
    $axios: NuxtAxiosInstance;
    $auth: Auth;
    complex: ActivitiesComplex,
    subscription: Subscription,
    activity: Activity,
    bodyPart: BodyPart,
    profile: Profile,
    traning: CurrentTraning,
};

let $services = {} as Services;

export function initializeServices(services: Omit<Services, '$auth'>) {
    if (services) {
        $services = {
            ...$services,
            ...services,
        };
    }
}

export { $services };
