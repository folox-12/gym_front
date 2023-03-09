import { defineStore } from "pinia";
import { NetworkData } from "~/types/helpers";
import { ActivitiesComplexType, ActivitiesComplexWithActivities } from "~/types/ActivitiesComplex";
import { $services } from "~/utils/service";
import { FiltersTypes } from "~/types/Filters";

interface State {
    activities: NetworkData<ActivitiesComplexType[]>;
    totalActivities: number;
    defaultFilters: FiltersTypes;
    currentActivity: NetworkData<ActivitiesComplexWithActivities>;
    isDeleted: NetworkData<boolean>;
}

export const DEFAULT_ACTIVITIES_FORM: ActivitiesComplexWithActivities = {
    id_activities_complex: undefined,
    id_author: null,
    title: null,
    description: null,
    date_creation: null,
    rating: 1,
    author: undefined,
    activities: [],
}
export const useActivitiesComplex = defineStore("activitiesComplex", {
    state: (): State => ({
        activities: {
            loading: false,
            data: null,
            error: null,
        },

        defaultFilters: {
            pagging: 1,
            search: "",
        },

        totalActivities: 0,

        currentActivity: {
            loading: false,
            data: null,
            error: null,
        },

        isDeleted: {
            loading: false,
            data: null,
            error: null,
        },
    }),

    getters: {
        // totalActivities: ({ activities }): number  => activities.data?.length || 0,
    },

    actions: {
        async getAllActivities(filters: FiltersTypes) {
            this.activities.loading = true;
            const { data, error}  = await $services.complex.getMainActivitiesComplex(
                filters
            );
            if (error) {
                return this.activities = {...this.activities, error, loading: false}
            }
            this.totalActivities = data!.totalCount;
            this.activities = {data: data!.result, loading: false}
        },

        async getCurrentActivity(id: string | number) {
            this.currentActivity.loading = true;
            const { data, error } = await $services.complex.getCurrentActivity(id);
            this.currentActivity = { data, error, loading: false};
        },

        async deleteActivity(id: string | number) {
            this.isDeleted.loading = true;
            const { data, error } = await $services.complex.deleteActivityComplex(id);
            this.isDeleted= { data, error, loading: false};
        },

        async isUserAuthorFetch(id: string | number) {
            const result = await $services.complex.isUserAuthor(id);
            return result;
        },


        resetCurrentActivityForm() {
            this.currentActivity.data = {
                ...DEFAULT_ACTIVITIES_FORM,
            };
        }
    },
});
