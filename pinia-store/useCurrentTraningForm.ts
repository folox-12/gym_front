import { defineStore } from 'pinia';
import { CurrentTranings } from '~/types/CurrentTraningsTypes';
import { ActivityType } from '~/types/Activity';

interface CurrentTraningsForm {
    id_traning?: number;
    date: Date | string;
    activitiesForTraning: ActivityType[];
}

interface State {
    traningForm: CurrentTraningsForm,
}

export const DEFAULT_TRANNING_FORM: CurrentTraningsForm = {
    id_traning: undefined,
    date: '',
    activitiesForTraning: [],
};
export const useTraningForm = defineStore('CurrentTraningForm', {
    state: (): State => ({
        traningForm: { ...DEFAULT_TRANNING_FORM },
    }),

    getters: {
    },

    actions: {
        updateForm(payload: Partial<CurrentTranings>) {
            this.traningForm = {
                ...this.traningForm,
                ...payload,
            };
        },

        resetCurrentActivityForm() {
            this.traningForm = {
                ...DEFAULT_TRANNING_FORM,
            };
        },
    },
});
