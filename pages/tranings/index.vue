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
            <template #default="{ updatePage, filters, total }">
                <div class="cards">
                        <div
                            v-for="(activity, index) of allActivities"
                            :key="index"
                        >
                            {{ activity }}
                        </div>
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
import TraningsPart from "~/components/parts/TraningsPart.vue";
import GymTitle from "~/components/Title.vue";
import { mapActions, mapState } from "pinia";
import { useActivitiesComplex } from "~/pinia-store/ActivitiesComplexStore";
import Filters from "~/components/Filters.vue";
import paggination from "~/components/paggination.vue";

const Mappers = Vue.extend({
    computed: {
        ...mapState(useActivitiesComplex, [
            "activities",
            "defaultFilters",
            "totalActivities",
        ]),
    },

    methods: {
        ...mapActions(useActivitiesComplex, ["getAllActivities"]),
    },
});
Component.registerHooks(["head"]);
@Component({
    name: "traningPage",
    components: {
        TraningsPart,
        GymTitle,
        Filters,
        paggination,
    },
})
export default class homePage extends Mappers {
    header = "Список программ - fitno";

    get allActivities() {
        return this.activities.data || [];
    }

    head() {
        return {
            title: this.header,
        };
    }
}
</script>
