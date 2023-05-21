<template>
    <div class="traning">
        <base-message
            v-if="$auth.loggedIn && !$auth.user?.isActivated"
            type="warning"
        >
            <base-text>
                Для получения полного доступа к функционалу приложения
                пожалуйста подтвердитe аккаунт на почте {{ $auth.user?.email }},
                а затем перезайдите в систему.
            </base-text>
        </base-message>
        <base-container>
            <gym-title>
                <template #default>
                    Выбор спортивной программы
                </template>
                <template #buttons>
                    <base-button
                        v-if="$auth.user?.isActivated"
                        @click="routeToNewPage"
                    >
                        Создать
                    </base-button>
                </template>
            </gym-title>
        </base-container>
        <filters
            :fetch-data="getAllActivities"
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
                            :author-name="
                                getFullName(
                                    activity.author?.name,
                                    activity.author?.surname
                                )
                            "
                            :author-email="activity.author?.email"
                            :date-creation="activity.date_creation"
                            :is-subscribed="
                                isComplexesInSubscription(activity.id_activities_complex)"
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
import { Vue, Component } from 'vue-property-decorator';
import GymTitle from '~/components/Title.vue';
import { mapActions, mapState } from 'pinia';
import { useActivitiesComplex } from '~/pinia-store/ActivitiesComplexStore';
import { useSubscription } from '~/pinia-store/SubscriptionStore';
import Filters from '~/components/Filters.vue';
import Paggination from '~/components/paggination.vue';
import { BaseCard, BaseButton, BaseContainer } from '~/components/base';
import CardContainer from '~/components/CardContainer.vue';
import CardActivitiesComplex from '~/components/CardActivitiesComplex.vue';
import { getFullNameFromNameAndSurname } from '~/utils/general';
import fetchSubscription from '~/middleware/fetchSubscribedIds';

const Mappers = Vue.extend({
    middleware: [fetchSubscription],
    computed: {
        ...mapState(useActivitiesComplex, [
            'activities',
            'defaultFilters',
            'totalActivities',
        ]),

        ...mapState(useSubscription, ['isSubscribed', 'subscribedComplexesId', 'isUnsubscribed']),
    },

    methods: {
        ...mapActions(useActivitiesComplex, ['getAllActivities']),

        ...mapActions(useSubscription, ['subscribeToComplex', 'unsubscribeFromComplex', 'fetchSubscribedComplexesId']),
    },
});
Component.registerHooks(['head']);
@Component({
    name: 'traningPage',
    components: {
        GymTitle,
        Filters,
        Paggination,
        BaseCard,
        BaseButton,
        CardContainer,
        CardActivitiesComplex,
        BaseContainer,
    },
})
export default class homePage extends Mappers {
    header = 'Список программ - fitno';

    get allActivities() {
        return this.activities.data || [];
    }

    // eslint-disable-next-line class-methods-use-this
    getFullName(name: string | undefined, surname: string | undefined) {
        return getFullNameFromNameAndSurname(name, surname);
    }

    isComplexesInSubscription(id?: string | number): boolean {
        if (id) {
            return (this.subscribedComplexesId.data || []).includes(id);
        }
        return false;
    }

    routeToNewPage() {
        this.$router.push('/tranings/new/');
    }

    async subscribe(id?: string | number) {
        if (!id) return;
        await this.subscribeToComplex(id);
        if (this.isSubscribed.error) {
            this.$notify({
                group: 'server-response',
                type: 'error',
                title: 'Ошибка',
                text: this.isSubscribed.error,
            });
        } else {
            this.$notify({
                group: 'server-response',
                type: 'success',
                title: 'Успешно',
                text: 'Вы подписались на программу!',
            });

            await this.fetchSubscribedComplexesId();
        }
    }

    async unsubscribe(id?: string | number) {
        if (!id) return;
        await this.unsubscribeFromComplex(id);
        if (this.isUnsubscribed.error) {
            this.$notify({
                group: 'server-response',
                type: 'error',
                title: 'Ошибка',
                text: this.isUnsubscribed.error,
            });
        } else {
            this.$notify({
                group: 'server-response',
                type: 'success',
                title: 'Успешно',
                text: 'Отписка от комплекcа упражнений удалась!',
            });
        }

        await this.fetchSubscribedComplexesId();
    }

    routeToComplex(id?: string | number) {
        if (!id) return;
        this.$router.push(`/tranings/${id}`);
    }

    head() {
        return {
            title: this.header,
        };
    }
}
</script>
