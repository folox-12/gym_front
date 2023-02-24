import { Plugin } from '@nuxt/types';
import { initializeServices } from '~/utils/service';
import ActivitiesComplex from '~/services/ActivitiesComplex';


const accessor: Plugin = (ctx) => {
    const {
        app: {
            $axios, i18n, router,
        },
    } = ctx;
    const complex = new ActivitiesComplex($axios);

    const services = {
        i18n,
        router,
        $axios,
        complex,
    };

    initializeServices(services);
};

export default accessor;
