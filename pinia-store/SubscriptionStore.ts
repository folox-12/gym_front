import { defineStore } from "pinia";
import { NetworkData } from "~/types/helpers";
import { $services } from "~/utils/service";

interface State {
    isSubscribed: NetworkData<boolean>;
    subscribedComplexesId: NetworkData<(number | string)[]>;
    isUnsubscribed: NetworkData<boolean>;
}

export const useSubscription = defineStore("Subscription", {
    state: (): State => ({
        isSubscribed: {
            data: null,
            loading: false,
            error: null,
        },

        isUnsubscribed: {
            data: null,
            loading: false,
            error: null,
        },

        subscribedComplexesId: {
            data: null,
            loading: false,
            error: null,
        },
    }),

    actions: {
        async subscribeToComplex(id: string | number) {
            this.isSubscribed.loading = true;

            const { data, error } =
                await $services.subscription.subscribeToComplex(id);
            this.isSubscribed = { data, error, loading: false };
        },

        async unsubscribeFromComplex(id: string | number) {
            this.isUnsubscribed.loading = true;

            const { data, error } =
                await $services.subscription.unsubscribeToComplex(id);
            this.isUnsubscribed= { data, error, loading: false };
        },

        async fetchSubscribedComplexesId() {
            this.subscribedComplexesId.loading = true;
            const data = await $services.subscription.fetchSubscribedComplexesId();
            this.subscribedComplexesId = {...data, loading: false};
        }
    },
});
