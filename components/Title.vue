<template>
    <h1 class="gm--title">
        <base-container>
            <base-text
                size="xxl" 
                weight="bold"
                color="dark"
            >
                <slot />
            </base-text>
        </base-container>
    </h1>
</template>
<script lang="ts">
import {
    Vue, Component,
} from 'vue-property-decorator';
import { BaseText, BaseContainer } from '~/components/base';

@Component({
    name: 'GymTitle',
    components: {
        BaseText,
        BaseContainer,
    }
})
export default class GymTitle extends Vue {

}
</script>
<style lang="less">
    .h1 {
        display: block;
    }
</style>