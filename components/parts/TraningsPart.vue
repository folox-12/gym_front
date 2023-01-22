<template>
    <div class="tranings-part">
        <base-container>
            <filters>
                <template>
                </template> 
            </filters>
        </base-container>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {BaseContainer} from '~/components/base'
import Filters from '~/components/Filters.vue'

@Component ({
    name: 'traningsPart',
    components: {
        Filters,
    }
})
export default class TraningsPart extends Vue {
}
</script>

<style lang="less">

</style>