import { Plugin } from '@nuxt/types';
import { initializeServices } from '~/utils/service';


const accessor: Plugin = (ctx) => {
    const {
        app: {
            $axios, i18n, router,
        },
    } = ctx;

    const services = {
        i18n,
        router,
        $axios,
    };

    initializeServices(services);
};

export default accessor;