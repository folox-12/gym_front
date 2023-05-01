import { defineStore } from "pinia";
import { ActivityType } from "~/types/Activity";
import { NetworkData } from "~/types/helpers";
import { $services } from "~/utils/service";


interface State {
    activities: NetworkData<Array<ActivityType>>;
}

export const useActivityStore = defineStore('activity', {
    state: ():State => ({
        activities: {
            loading: false,
            data: null,
            error: null,
        },
    }),
    getters: {
        allActivities({activities: { data }}): ActivityType[] {
            return data || [];
        },
        bodyParts({activities: { data }}) {
            return data?.map(el => el.bodypart)
        },
        difficulties({activities: { data }}) {
            return data?.map(el => el.difficulty)
        },
    },
    actions: {
        async getAllActivities() {
            this.activities.loading = true;
            const { data, error}  = await $services.activity.fetchAllActivity();
            if (error) {
                return this.activities = {...this.activities, error, loading: false}
            }
            this.activities = {data, loading: false, error:null}
        },
    }
})
