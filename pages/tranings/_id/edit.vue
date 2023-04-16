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
        <traning-form-edit
            :activity="currentTraningsInformation"
            :loading="currentActivity.loading"
            :showButton="$auth.loggedIn"
            @edit="edit"
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
import TraningFormEdit from "~/components/tranings/TraningFormEdit.vue";
import { mdiDelete, mdiCreditCard } from "@mdi/js";
import isUserAuthorComplex from "~/middleware/isUserAuthorComplex"
import authorizated from "~/middleware/auth"

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
        TraningFormEdit,
        BaseText,
        BaseButton,
        BaseIcon,
    },

    middleware: [authorizated, isUserAuthorComplex]
})
export default class CurrentTranings extends Mixins(getCurrentId, Mappers) {
    get header() {
        return `Редактирование программы №${this.currentId}`;
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
                icon: mdiCreditCard,
                color: "basic",
                title: "Вернуться на страницу карточки",
                action: this.routeToSimple,
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
        alert("delete")
    }

    routeToSimple() {
        this.$router.push(`/tranings/${this.currentId}`);
    }

    async edit() {
        alert('edit')
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
