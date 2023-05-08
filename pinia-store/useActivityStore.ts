import { defineStore } from "pinia";
import { ActivityToSendType, ActivityType } from "~/types/Activity";
import { NetworkData } from "~/types/helpers";
import { $services } from "~/utils/service";


interface State {
    activities: NetworkData<Array<ActivityType>>;
    adaptionNewActivity: NetworkData<number>;
}

export const useActivityStore = defineStore('activity', {
    state: ():State => ({
        activities: {
            loading: false,
            data: null,
            error: null,
        },
        adaptionNewActivity: {
            loading: false,
            data: null,
            error: null,
        }
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
                this.activities = {...this.activities, error, loading: false}
                return;
            }
            this.activities = {data, loading: false, error:null}
        },

        async createNewActivity(activity: ActivityToSendType) {
            this.adaptionNewActivity.loading = true;
            const { data, error}  = await $services.activity.createNewActivity(activity);

            if(error) {
                this.adaptionNewActivity = { ...this.adaptionNewActivity, error, loading: false}
                return;
            }
               
            this.adaptionNewActivity= {data, loading: false, error:null}
        },
    }
})
