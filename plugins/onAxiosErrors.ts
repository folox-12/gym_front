import { Plugin } from '@nuxt/types';

const plugin: Plugin = ({
    $axios,
    redirect,
    app,
}) => {
    $axios.onError((error) => {
        if (error?.response?.data?.error === 'TokenExpiredError') {
            const path = '/time-out'

            redirect(path);


            app.$auth.reset()
        } else {
            const message = error.response?.data.error;
            const transmittedData = error.response?.status;
            const responseError = {
                ...error,
                responseError: {
                    message,
                    transmittedData,
                },
            };

            throw responseError;

        }
    });
};

export default plugin;
