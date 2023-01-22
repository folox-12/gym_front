<template>
    <component
        :is="as"
        class="base-container"
        :class="containerBase"
   > 
        <slot/>
    </component>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

enum ContainerTag {
    DIV = 'div',
    SECTION = 'section',
}
@Component
export default class BaseContainer extends Vue {
    @Prop({
        type: String as () => ContainerTag,
        default: ContainerTag.DIV,
    }) as!: ContainerTag;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly infinity!: boolean;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly noPadding?: boolean;

    get containerBase() {
        return {
            'base-container--infinity':this.infinity,
            'base-container--no-padding':this.noPadding,
        }
    }
}
</script>

<style lang="less">
.base-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0px auto;
    padding: 0 15px;

    &--infinity {
        max-width: 100%;
    }

    &--no-padding {
        padding: 0 0;
    }
}

</style>
