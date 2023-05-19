<template>
    <div>
        <gym-title>
            Подиски
        </gym-title>
        <base-container :class="$style.info">
            <ProfileCard>
                <card-container>
                    <card-activities-complex
                        v-for="(activity, index) of subscription"
                        :key="index"
                        :title="activity.title"
                        :description="activity.description"
                        :author-name="
                            getFullName(
                                activity.author.name,
                                activity.author.surname
                            )
                        "
                        :author-email="activity.author.email"
                        :date-creation="activity.date_creation"
                        :is-subscribed="true"
                        @unsubscribeFromComplex="
                            unsubscribeFromProfile(activity.id_activities_complex)
                        "
                        @routeToComplex="
                            routeToComplex(activity.id_activities_complex)
                        "
                    />
                </card-container>
            </ProfileCard>
        </base-container>
    </div>
</template>
<script lang="ts">
import {
    Component, Prop, Mixins, Vue,
} from 'vue-property-decorator';
import { BaseContainer, BaseText } from '~/components/base';
import { FormRow } from '~/components/form/';
import { ActivitiesComplexWithActivities } from '~/types/ActivitiesComplex';
import CardContainer from '~/components/CardContainer.vue';
import CardActivitiesComplex from '~/components/CardActivitiesComplex.vue';
import TraningsCardMixin from '~/components/mixins/TraningCard';
import { mdiCalendarClock } from '@mdi/js';
import GymTitle from '~/components/Title.vue';
import { mapState, mapActions } from 'pinia';
import { useSubscription } from '~/pinia-store/SubscriptionStore';

const Mappers = Vue.extend({
    computed: {
        ...mapState(useSubscription, [
            'subscribedComplexes',
        ]),
    },

    methods: {
        ...mapActions(useSubscription, [
            'fetchSubscribedComplexes',
        ]),
    },
});

@Component({
    components: {
        GymTitle,
        BaseContainer,
        BaseText,
        FormRow,
        CardContainer,
        CardActivitiesComplex,
    },
})
export default class TraningSubscription extends Mixins(TraningsCardMixin, Mappers) {
    get subscription() {
        return this.subscribedComplexes?.data || [];
    }

    async updateSubscription() {
        await this.fetchSubscribedComplexes();
    }

    async unsubscribeFromProfile(id: number | string) {
        await this.unsubscribe(id);
        if (!this.isUnsubscribed.error) {
            await this.updateSubscription();
        }
    }

    async fetch() {
        await this.updateSubscription();
    }
}
</script>

<style lang="less" module>
.info {
    padding: 15px;
    background-color: #fff;
    display: flex;
    gap: 5px;
}

.right {
    flex: 1 1 auto;
}
</style>
