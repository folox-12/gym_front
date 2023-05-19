import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default class APIService {
    protected $axios: NuxtAxiosInstance;

    constructor($axios: NuxtAxiosInstance) {
        this.$axios = $axios;
    }
}
