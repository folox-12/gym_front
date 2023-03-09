<template>
    <div>
        <modal
            v-if="showConfirmModal"
            :loading="isDeleted.loading"
            @close="() => showConfirmModal=false"
            @confirm="deleleteCurrentActivity"
        >
        <template #header>
            <base-text color="normal" weight="bold" size="xl">
                Вы действительно хотите удалить программу?
            </base-text>
        </template>
        </modal>
        <base-container>
            <nuxt-link to="/tranings/">
                {{ "<< Вернуться" }}
            </nuxt-link>
        </base-container>
        <base-message
            v-if="!$auth.loggedIn"
            :class="$style.message"
            type="warning"
        >
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
                            :title="icon.title"
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
            :button-text="buttonProperty.text"
            :button-loading="isSubscribed.loading || isUnsubscribed.loading || currentActivity.loading"
            @buttonCallback="buttonProperty.callback"
        />
    </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins } from "vue-property-decorator";
import getCurrentId from "~/components/mixins/getCurrentId";
import GymTitle from "~/components/Title.vue";
import { mapState, mapActions } from "pinia";
import {
    DEFAULT_ACTIVITIES_FORM,
    useActivitiesComplex,
} from "~/pinia-store/ActivitiesComplexStore";
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
import Modal from "~/components/Modal.vue";

const Mappers = Vue.extend({
    computed: {
        ...mapState(useActivitiesComplex, ["currentActivity", "isDeleted"]),
        ...mapState(useSubscription, ["isSubscribed", "isUnsubscribed","subscribedComplexesId"]),
    },

    methods: {
        ...mapActions(useActivitiesComplex, [
            "getCurrentActivity",
            "resetCurrentActivityForm",
            "deleteActivity"
        ]),

        ...mapActions(useSubscription, ["subscribeToComplex", "unsubscribeFromComplex", "fetchSubscribedComplexesId"]),
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
        Modal,
    },

    middleware: [fetchSubscription],
})
export default class CurrentTranings extends Mixins(getCurrentId, Mappers) {
    showConfirmModal:boolean = false;

    get header() {
        return `Программа тренировок № ${this.currentId}`;
    }

    get currentTraningsInformation() {
        return this.currentActivity.data || DEFAULT_ACTIVITIES_FORM;
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
                action: ()=> this.showConfirmModal = true,
                show: this.isUserAuthor,
            },
        };
    }

    get isComplexInSubscription() {
        return (this.subscribedComplexesId.data || []).includes(this.currentId);
    }


    get buttonProperty() {
        return this.isComplexInSubscription
            ? {
                  text: "Отписаться",
                  callback: () => this.updateSubscription(this.unsubscribeFromComplex),
              }
            : {
                  text: "Подписаться",
                  callback: () => this.updateSubscription(this.subscribeToComplex),
              };
    }

    async deleleteCurrentActivity() {
        await this.deleteActivity(this.currentId)

        if (this.isDeleted.error) {
            this.$notify({
                group: "server-response",
                type: "error",
                title: "Ошибка",
                text: this.isDeleted.error,
            });
        } else {
            this.$notify({
                group: "server-response",
                type: "success",
                title: "Успешно",
                text: 'Комплекс удален'
            });

            this.showConfirmModal = false;
            this.$router.push('/tranings/')
        }

    }

    routeToEdit() {
        this.$router.push(`/tranings/${this.currentId}/edit`);
    }

    async updateSubscription(callback: (id: string | number) => Promise<void>) {
        let errorText: string = "";
        await callback(this.currentId);

        if (this.isSubscribed.error) {
            errorText = this.isSubscribed.error
        }
        if (this.isUnsubscribed.error) {
            errorText = this.isUnsubscribed.error
        }

        if(this.isUnsubscribed.error || this.isSubscribed.error) {
            return this.$notify({
                group: "server-response",
                type: "error",
                title: "Ошибка",
                text: errorText,
            });
        } else {
            this.$notify({
                group: "server-response",
                type: "success",
                title: "Успешно",
                text: "Операция удалась",
            });

            await this.fetchSubscribedComplexesId();
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
</style>
