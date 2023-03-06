<template>
    <div class="traning">
        <base-message
            v-if="$auth.loggedIn && !$auth.user.isActivated"
            type="warning"
        >
            <base-text>
                Для получения полного доступа к функционалу приложения
                пожалуйста подтвердитe аккаунт на почте {{ $auth.user.email }},
                а затем перезайдите в систему.
            </base-text>
        </base-message>
        <gym-title> Выбор спортивной программы </gym-title>
        <filters
            :fetchData="getAllActivities"
            :default-filters="defaultFilters"
            :loading="activities.loading"
            :total="totalActivities"
            search-string="Поиск по названию программы тренировок"
        >
            <template #searchText="{ search, total }">
                По запросу <b>{{ search }}</b> найдено {{ total }} шт. программ
                упражнений
            </template>
            <template #default="{ updatePage, filters, total }">
                <div>
                    <card-container>
                        <card-activities-complex
                            v-for="(activity, index) of allActivities"
                            :key="index"
                            :title="activity.title"
                            :description="activity.description"
                            :authorName="
                                getFullName(
                                    activity.author.name,
                                    activity.author.surname
                                )
                            "
                            :authorEmail="activity.author.email"
                            :dateCreation="activity.date_creation"
                            :is-subscribed="isComplexesInSubscription(activity.id_activities_complex)"
                            @subscribeToComplex="
                                subscribe(activity.id_activities_complex)
                            "
                            @unsubscribeFromComplex="unsubscribe(activity.id_activities_complex)"
                            @routeToComplex="
                                routeToComplex(activity.id_activities_complex)
                            "
                        />
                    </card-container>
                </div>
                <paggination
                    :per-page="filters.pagging"
                    :size-page="filters.paggingSize"
                    :total-count="total"
                    @updatePage="updatePage"
                />
            </template>
        </filters>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GymTitle from "~/components/Title.vue";
import { mapActions, mapState } from "pinia";
import { useActivitiesComplex } from "~/pinia-store/ActivitiesComplexStore";
import { useSubscription } from "~/pinia-store/SubscriptionStore";
import Filters from "~/components/Filters.vue";
import Paggination from "~/components/paggination.vue";
import { BaseCard } from "~/components/base";
import CardContainer from "~/components/CardContainer.vue";
import CardActivitiesComplex from "~/components/CardActivitiesComplex.vue";
import { getFullNameFromNameAndSurname } from "~/utils/general";
import fetchSubscription from "~/middleware/fetchSubscribedIds";

const Mappers = Vue.extend({
    computed: {
        ...mapState(useActivitiesComplex, [
            "activities",
            "defaultFilters",
            "totalActivities",
        ]),

        ...mapState(useSubscription, ["isSubscribed", "subscribedComplexesId", "isUnsubscribed"]),
    },

    methods: {
        ...mapActions(useActivitiesComplex, ["getAllActivities"]),

        ...mapActions(useSubscription, ["subscribeToComplex", "unsubscribeFromComplex", "fetchSubscribedComplexesId"]),
    },

    middleware: [fetchSubscription],

});
Component.registerHooks(["head"]);
@Component({
    name: "traningPage",
    components: {
        GymTitle,
        Filters,
        Paggination,
        BaseCard,
        CardContainer,
        CardActivitiesComplex,
    },
})
export default class homePage extends Mappers {
    header = "Список программ - fitno";

    getFullName(name: string, surname: string) {
        return getFullNameFromNameAndSurname(name, surname);
    }

    get allActivities() {
        return this.activities.data || [];
    }

    isComplexesInSubscription(id: string | number) {
        return (this.subscribedComplexesId.data || []).includes(id) ;
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
                text: 'Вы подписались на программу!'
            });

            await this.fetchSubscribedComplexesId()
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
                text: 'Отписка от комплекcа упражнений удалась!'
            });
        }

        await this.fetchSubscribedComplexesId()
    }

    routeToComplex(id: string | number) {
        this.$router.push(`/tranings/${id}/`);
    }

    head() {
        return {
            title: this.header,
        };
    }
}
</script>
