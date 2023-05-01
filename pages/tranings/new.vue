
<template>
    <div>
        <modal
            v-if="showConfirmModal"
            :loading="isDeleted.loading"
            @close="() => (showConfirmModal = false)"
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
        <gym-title>
            <template #default>Новый комплекс упражнений</template>
        </gym-title>
        <traning-form-edit
            ref="traningFormEdit"
            :loading="currentActivity.loading"
            :showButton="$auth.loggedIn"
            @edit="edit"
        />
    </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins, Ref } from "vue-property-decorator";
import GymTitle from "~/components/Title.vue";
import { mapState, mapActions } from "pinia";
import { useActivitiesComplex } from "~/pinia-store/ActivitiesComplexStore";
import { useSubscription } from "~/pinia-store/SubscriptionStore";
import { useActivitiesComplexForm } from "~/pinia-store/useActivitiesComplexForm";
import {
    BaseContainer,
    BaseText,
    BaseButton,
    BaseIcon,
} from "~/components/base";
import TraningFormEdit from "~/components/tranings/TraningFormEdit.vue";
import authorizated from "~/middleware/auth";
import { ActivitiesComplexWithActivities } from "~/types/ActivitiesComplex";

const Mappers = Vue.extend({
    computed: {
        ...mapState(useActivitiesComplex, ["currentActivity", "isDeleted"]),
        ...mapState(useSubscription, ["isSubscribed"]),
        ...mapState(useActivitiesComplexForm, ["activitiesComplexForm"])
    },

    methods: {
        ...mapActions(useActivitiesComplex, [
            "resetCurrentActivityForm",
            "createActivitiesComplex",
        ]),

        ...mapActions(useActivitiesComplexForm, ["updateForm"]),
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

    middleware: [authorizated],
})
export default class CurrentTranings extends Mixins(Mappers) {
    @Ref() readonly traningFormEdit!: typeof TraningFormEdit;

    showConfirmModal: boolean = false;

    get header() {
        return 'Создание нового комплекса упражнения';
    }

    async edit() {
        const { isValid } = this.traningFormEdit.validateForm();
        if (!isValid) {
            this.$notify({
                group: "server-response",
                type: "error",
                title: "Ошибка",
                text: 'Проверьте правильность ввода данных'
            });

            return;
        }
        const newForm = {
            ...this.activitiesComplexForm,
            date_creation: this.$dayjs(new Date()).format("YYYY-MM-DD")
        };
        this.createActivitiesComplex(newForm as ActivitiesComplexWithActivities)
    }
    head() {
        return {
            title: this.header,
        };
    }

    beforeDestroy() {
        this.resetCurrentActivityForm();
    }

    created() {
        this.updateForm({ date_creation: new Date()})
    }

}
</script>
