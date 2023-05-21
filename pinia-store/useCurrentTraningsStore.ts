import { defineStore } from 'pinia';
import { NetworkData } from '~/types/helpers';
import { $services } from '~/utils/service';
import { CurrentTranings } from '~/types/CurrentTraningsTypes';

interface State {
    traning: NetworkData<CurrentTranings>,
    updatingTraning: NetworkData<boolean>,
}

export const useTraningStore = defineStore('traning', {
    state: (): State => ({
        traning: {
            data: null,
            loading: false,
            error: null,
        },

        updatingTraning: {
            data: null,
            loading: false,
            error: null,
        },
    }),

    getters: {
        traningValue: ({ traning }) => traning.data?.activitiesForTraning || [],
    },

    actions: {
        async fetchCurrentTraning(date: string) {
            this.traning.loading = true;

            const { data, error } = await $services.traning.fetchCurrentTraning(date);
            if (error) {
                this.traning = { ...this.traning, error, loading: false };
                return;
            }
            this.traning = { data, loading: false, error: null };
        },

        async updateCurrentTraning(form: Partial<CurrentTranings>) {
            this.updatingTraning.loading = true;

            const { data, error } = await $services.traning.updateCurrentTraning(form);

            if (error) {
                this.updatingTraning = { ...this.updatingTraning, error, loading: false };
                return;
            }
            this.updatingTraning = { data, loading: false, error: null };
        },

    },
});
