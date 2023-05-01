<template>
    <div class="profile">
    <gym-title>
        Личный профиль
    </gym-title>
        <profile-info
            :complexes="subscription"
            @updateInfo="updateSubscription"
         />

    </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins } from "vue-property-decorator";
import authorizated from "~/middleware/auth"
import GymTitle from "~/components/Title.vue";
import ProfileInfo from "~/components/profiles/ProfileInfo.vue";
import { useSubscription } from "~/pinia-store/SubscriptionStore";
import { mapState, mapActions } from "pinia";

const Mappers = Vue.extend({
    computed: {
        ...mapState(useSubscription, [
            'subscribedComplexes',
        ]),
    },

    methods: {
        ...mapActions(useSubscription, [
            'fetchSubscribedComplexes',
        ]
        )
    }
})

Component.registerHooks(["fetch"])
@Component({
    components: {
        GymTitle,
        ProfileInfo,
    },

    middleware: [authorizated]
})

export default class ProfilePage extends Mappers {
    header = "Личный кабинет";

    get subscription() {
        return this.subscribedComplexes?.data || []
    }

    head() {
        return {
            title: this.header,
        };
    }

    async updateSubscription() {
        await this.fetchSubscribedComplexes();
    }

    async fetch() {
        await this.fetchSubscribedComplexes();
    }
}
</script>
