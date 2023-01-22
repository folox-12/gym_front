<template>
    <component
        :is="as"
        v-bind="$attrs"
        class="gm-button"
        :class="textClasses"
        v-on="$listeners"
    >
        <slot>
            {{ text }}
        </slot>
    </component>
</template>
<script lang="ts">
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';

enum TextTag {
    A = 'a',
    BUTTON = 'button',
}

enum TextSize {
    XXS = 'xxs',
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
}

enum TextWeight {
    REGULAR = 'regular',
    MEDIUM = 'medium',
    SEMIBOLD = 'semibold',
    BOLD = 'bold',
}

@Component({
    inheritAttrs: false,
    name: 'BaseBUtton',
})
export default class Button extends Vue {
    @Prop({
        type: String as () => TextSize,
        default: TextSize.MD,
        validator: (value: TextSize) => Object
            .values(TextSize)
            .includes(value),
    }) readonly size!: TextSize;

    @Prop({
        type: String as () => TextWeight,
        default: undefined,
        validator: (value: TextWeight) => Object
            .values(TextWeight)
            .includes(value),
    }) readonly weight?: TextWeight;

    @Prop({
        type: String as () => TextTag,
        default: TextTag.BUTTON,
        validator: (value: TextTag) => Object
            .values(TextTag)
            .includes(value),
    }) readonly as!: TextTag;

    @Prop({
        type: Boolean,
        default: false,
    }) readonly breakWord!: boolean;

    @Prop({
        type: Boolean,
        default: false,
    }) readonly textOverflow!: boolean;

    @Prop({
        type: String,
        required: false,
    }) readonly text?: string;

    get textClasses() {
        return {
            [`gm-button--${this.size}`]: this.size,
            [`gm-button--${this.weight}`]: this.weight,
            'gm-button--break-word': this.breakWord,
        };
    }
}
</script>

<style lang="less">
a.gm-button {
    text-decoration: none;
    color: var(--gm-colors-primary);
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}
button.gm-button {
    color: var(--gm-colors-white);
    border: 1px solid var(--gm-colors-primary);
    border-radius: var(--gm-border-radius);
    background: var(--gm-main-gradient-background);
    padding: 5px 8px;
    cursor: pointer;

    &:hover {
        box-shadow: var(--gm-shadow-general-box);
        color:var(--gm-colors-white-alpha-400);
    }

    &--bold { font-weight: var(--gm-font-weight-bold); }
    &--xxs { font-size: var(--gm-font-size-xxs); }
    &--xs {  font-size: var(--gm-font-size-xs); }
    &--sm {  font-size: var(--gm-font-size-sm); }
    &--md { font-size: var(--gm-font-size-md); }
    &--lg { font-size: var(--gm-font-size-lg); }
    &--xl { font-size: var(--gm-font-size-xl); }
    &--break-word { word-break: break-word; }
}

</style>
