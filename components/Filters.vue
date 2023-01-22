<template>
    <div class="gm-filter">
        <slot name="view"/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {BaseContainer} from '~/components/base'

@Component ({
    name: 'filter',
    components: {
        BaseContainer,
    }
})
export default class Filter extends Vue {
    @Prop({
        type: Function,
        default: () => null,
    }) readonly fetchData!: (...args:any) => any;
}
</script>

<style lang="less">

</style>