import { defineStore } from 'pinia';
import { ActivityType } from '~/types/Activity';
import { UserAsAuthor } from '~/types/Users';

export interface ActivitiesComplexForm {
    id_activities_complex: number | null;
    id_author: number | null;
    title: string | null;
    description: string | null;
    date_creation: Date | null;
    author?: UserAsAuthor;
    activities: ActivityType[];
}

interface State {
    activitiesComplexForm: ActivitiesComplexForm;
}

export const DEFAULT_ACTIVITIES_FORM: ActivitiesComplexForm = {
    id_activities_complex: null,
    id_author: null,
    title: null,
    description: null,
    date_creation: null,
    activities: [],
};
export const useActivitiesComplexForm = defineStore('activitiesComplexForm', {
    state: (): State => ({
        activitiesComplexForm: { ...DEFAULT_ACTIVITIES_FORM },
    }),
    getters: {
        activities(): ActivityType[] {
            return this.activitiesComplexForm.activities;
        },
    },
    actions: {
        updateForm(payload: Partial<ActivitiesComplexForm>) {
            this.activitiesComplexForm = {
                ...this.activitiesComplexForm,
                ...payload,
            };
        },
        resetCurrentActivityForm() {
            this.activitiesComplexForm = {
                ...DEFAULT_ACTIVITIES_FORM,
            };
        },
    },
});
