<template>
    <div :class="$style.container">
        <slot />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { BaseContainer } from '~/components/base/';

@Component({
    components: {
        BaseContainer,
    },
})
export default class CardContainer extends Vue {}
</script>

<style lang="less" module>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
}
</style>
