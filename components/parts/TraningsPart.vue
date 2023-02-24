<template>
    <div class="tranings-part">
        <base-container>
            <filters>
            </filters>
        </base-container>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {BaseContainer} from '~/components/base'
import Filters from '~/components/Filters.vue'
import {mapActions, mapState} from 'pinia';
import { useActivitiesComplex} from '~/pinia-store/ActivitiesComplexStore';

const Mappers = Vue.extend({
    computed: {
        ...mapState(useActivitiesComplex, [
            'activities',
        ])
    },
    methods: {
        ...mapActions(useActivitiesComplex, [
            'getAllActivities',
        ])
    },
})

Component.registerHooks(['fetch']);
@Component ({
    name: 'traningsPart',
    components: {
        Filters,
        BaseContainer,
    }
})
export default class TraningsPart extends Mappers{

}
</script>

<style lang="less">

</style>
