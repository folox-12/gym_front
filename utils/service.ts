import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueRouter from 'vue-router';
import VueI18n, { IVueI18n } from 'vue-i18n';
import { Auth } from '@nuxtjs/auth-next';

type Services = {
    i18n: VueI18n & IVueI18n;
    router: VueRouter | undefined;
    $axios: NuxtAxiosInstance;
    $auth: Auth;
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