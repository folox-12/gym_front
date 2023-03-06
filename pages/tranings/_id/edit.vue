<template>
    <div :class="$style.currentTraning">
        <base-container>
            <nuxt-link to="/tranings/">
                {{ "<< Вернуться" }}
            </nuxt-link>
        </base-container>
        <gym-title>
            <template #default>{{ currentTraningsInformation.title }}</template>
            <template #buttons>
                    <base-button>

                    </base-button>
            </template>

        </gym-title>
        Редач
        <traning-form
            :activity="currentTraningsInformation"
            :loading="currentActivity.loading"
            @subscribe="subscribe"
        />
    </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins } from "vue-property-decorator";
import getCurrentId from "~/components/mixins/getCurrentId";
import GymTitle from "~/components/Title.vue";
import { mapState, mapActions } from "pinia";
import { useActivitiesComplex } from "~/pinia-store/ActivitiesComplexStore";
import { useSubscription } from "~/pinia-store/SubscriptionStore";
import { BaseContainer, BaseText, BaseButton, BaseIcon } from "~/components/base";
import TraningForm from "~/components/tranings/TraningForm.vue";
import { mdiTableEdit } from "@mdi/js";

const Mappers = Vue.extend({
    computed: {
        ...mapState(useActivitiesComplex, ["currentActivity"]),
        ...mapState(useSubscription, [
            'isSubscribed'
        ]),
    },

    methods: {
        ...mapActions(useActivitiesComplex, [
            "getCurrentActivity",
            "resetCurrentActivityForm",
        ]),

        ...mapActions(useSubscription, [
            'subscribeToComplex'
        ]),
    },
});

@Component({
    components: {
        GymTitle,
        BaseContainer,
        TraningForm,
        BaseText,
        BaseButton,
        BaseIcon,
    },
})
export default class CurrentTranings extends Mixins(getCurrentId, Mappers) {
    get header() {
        return `Редактирование ${this.currentId}`;
    }

    get currentTraningsInformation() {
        return this.currentActivity.data || {};
    }

    get icons() {
        return [
            {
                icon: mdiTableEdit,
                path: `/tranings/${this.currentId}/edit`
            },
            {
                icon: mdiTableEdit,
                path: `/tranings/${this.currentId}/`
            }
        ]
    }

    async subscribe() {
        await this.subscribeToComplex(this.currentId);
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
            text: 'Успешно подисались',
        });

    }
    }
    head() {
        return {
            title: this.header,
        };
    }

    beforeDestroy() {
        this.resetCurrentActivityForm();
    }
    async fetch() {
        await this.getCurrentActivity(this.currentId);
    }
}
</script>
<style lang="less" module>
.current-traning {
}
</style>
