import { Component, Vue } from "vue-property-decorator";
import { useSubscription } from "~/pinia-store/SubscriptionStore";
import { mapActions, mapState } from "pinia";
import { getFullNameFromNameAndSurname } from "~/utils/general";

const Mappers = Vue.extend({
    computed: {
        ...mapState(useSubscription, [
            "isSubscribed",
            "subscribedComplexesId",
            "isUnsubscribed",
        ]),
    },

    methods: {
        ...mapActions(useSubscription, [
            "subscribeToComplex",
            "unsubscribeFromComplex",
            "fetchSubscribedComplexesId",
        ]),
    },
});

@Component
export default class TraningsCardMixin extends Mappers {
    isComplexesInSubscription(id: string | number) {
        return (this.subscribedComplexesId.data || []).includes(id);
    }

    getFullName(name: string, surname: string) {
        return getFullNameFromNameAndSurname(name, surname);
    }
    async subscribe(id: string | number) {
        await this.subscribeToComplex(id);
        if (this.isSubscribed.error) {
            this.$notify({
                group: "server-response",
                type: "error",
                title: "Ошибка",
                text: this.isSubscribed.error,
            });
        } else {
            this.$notify({
                group: "server-response",
                type: "success",
                title: "Успешно",
                text: "Вы подписались на программу!",
            });

            await this.fetchSubscribedComplexesId();
        }
    }

    async unsubscribe(id: string | number) {
        await this.unsubscribeFromComplex(id);
        if (this.isUnsubscribed.error) {
            this.$notify({
                group: "server-response",
                type: "error",
                title: "Ошибка",
                text: this.isUnsubscribed.error,
            });
        } else {
            this.$notify({
                group: "server-response",
                type: "success",
                title: "Успешно",
                text: "Отписка от комплекcа упражнений удалась!",
            });
        }

        await this.fetchSubscribedComplexesId();
    }

    routeToComplex(id: string | number) {
        this.$router.push(`/tranings/${id}/`);
    }
}
