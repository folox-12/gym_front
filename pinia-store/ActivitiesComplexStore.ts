import { defineStore } from "pinia";
import { NetworkData } from "~/types/helpers";
import { ActivitiesComplexType } from "~/types/ActivitiesComplex";
import { $services } from "~/utils/service";
import { FiltersTypes } from "~/types/Filters";

interface State {
    activities: NetworkData<Array<ActivitiesComplexType>>;
    totalActivities: number;
    defaultFilters: FiltersTypes;
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
            paggingSize: 1,
        },

        totalActivities: 0,
    }),

    getters: {
        // totalActivities: ({ activities }): number  => activities.data?.length || 0,
    },

    actions: {
        async getAllActivities(filters: FiltersTypes) {
            this.activities.loading = true;
            const data = await $services.complex.getMainActivitiesComplex(
                filters
            );
            this.activities.loading = false;

            this.activities.data = data.result;
            this.totalActivities = data.totalCount;
        },
    },
});
