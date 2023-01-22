import { Plugin } from '@nuxt/types';

const plugin: Plugin = ({
    $axios,
    redirect,
    app,
}) => {
    $axios.onError((error) => {
        if (error?.response?.data?.message === 'TokenExpiredError') {
            const path = '/time-out'
            app.$auth.reset()
            if (process.client) {
                console.log("client")
                window.location.replace(path);
            } else {
                console.log("client")
                redirect(path);
            }
        } else {
            const { message } = error.response?.data;
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
