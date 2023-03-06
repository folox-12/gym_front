<template>
    <div :class="$style.currentTraning">
        <base-container>
            <nuxt-link to="/tranings/">
                {{ "<< Вернуться" }}
            </nuxt-link>
        </base-container>
        <base-message :class="$style.message" type="warning">
            <base-text>
                Для того чтобы иметь возможность подписаться, авторизируйтесь на
                сайте!
            </base-text>
        </base-message>
        <gym-title>
            <template #default>{{ currentTraningsInformation.title }}</template>
            <template #buttons>
                <div class="d-flex">
                    <div v-for="(icon, index) of icons" :key="index">
                        <base-button
                            v-if="icon.show"
                            variant="unstyle"
                            title="Редактировать"
                            @click="icon.action"
                        >
                            <base-icon :path="icon.icon" :color="icon.color" />
                        </base-button>
                    </div>
                </div>
            </template>
        </gym-title>
        <traning-form
            :activity="currentTraningsInformation"
            :loading="currentActivity.loading"
            :show-button="$auth.loggedIn"
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
import {
    BaseContainer,
    BaseText,
    BaseButton,
    BaseIcon,
    BaseMessage,
} from "~/components/base";
import TraningForm from "~/components/tranings/TraningForm.vue";
import { mdiDelete, mdiTableEdit } from "@mdi/js";
import fetchSubscription from "~/middleware/fetchSubscribedIds";

const Mappers = Vue.extend({
    computed: {
        ...mapState(useActivitiesComplex, ["currentActivity"]),
        ...mapState(useSubscription, ["isSubscribed", "subscribedComplexesId"]),
    },

    methods: {
        ...mapActions(useActivitiesComplex, [
            "getCurrentActivity",
            "resetCurrentActivityForm",
        ]),

        ...mapActions(useSubscription, ["subscribeToComplex"]),
    },
});
Component.registerHooks(["head"]);
@Component({
    components: {
        GymTitle,
        BaseContainer,
        TraningForm,
        BaseText,
        BaseButton,
        BaseIcon,
        BaseMessage,
    },

    middleware: [fetchSubscription],
})
export default class CurrentTranings extends Mixins(getCurrentId, Mappers) {
    get header() {
        return `Программа тренировок № ${this.currentId}`;
    }

    get currentTraningsInformation() {
        return this.currentActivity.data;
    }

    get isUserAuthor() {
        return this.currentTraningsInformation
            ? this.$auth?.user?.id === this.currentTraningsInformation.id_author
            : false;
    }

    get icons() {
        return {
            iconEdit: {
                icon: mdiTableEdit,
                color: "basic",
                title: "Редактировать",
                action: this.routeToEdit,
                show: this.isUserAuthor,
            },

            iconDelete: {
                icon: mdiDelete,
                color: "danger",
                title: "Удалить",
                action: this.deleleteCurrentActivity,
                show: this.isUserAuthor,
            },
        };
    }

    deleleteCurrentActivity() {
        alert("delete");
    }

    routeToEdit() {
        this.$router.push(`/tranings/${this.currentId}/edit`);
    }

    isComplexesInSubscription(id: string | number) {
        return (this.subscribedComplexesId.data || []).includes(id);
    }

    async subscribe() {
        await this.subscribeToComplex(this.currentId);
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
                text: "Успешно подисались",
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
.message {
    margin-top: 10px;
}

.current-traning {
}
</style>
