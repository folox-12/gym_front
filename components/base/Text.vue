<template>
    <component
        :is="as"
        v-bind="$attrs"
        class="gm-text"
        :class="textClasses"
        v-on="$listeners"
    >
        <slot />
    </component>
</template>
<script lang="ts">
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';

enum TextTag {
    DIV = 'div',
    P = 'p',
    SPAN = 'span',
}

enum TextColor {
    ACCENT = 'accent',
    NORMAL = 'normal',
    LIGHTER = 'lighter',
    LIGHT = 'light',
    DARK = 'dark',
    WHITE = 'white',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    ERROR = 'error',
}

enum TextSize {
    XXS = 'xxs',
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
    XXL = 'xxl',
}

enum TextWeight {
    REGULAR = 'regular',
    MEDIUM = 'medium',
    SEMIBOLD = 'semibold',
    BOLD = 'bold',
}

@Component({
    inheritAttrs: false,
    name: 'BaseText',
})
export default class Text extends Vue {
    @Prop({
        type: String as () => TextColor,
        default: TextColor.NORMAL,
        validator: (value: TextColor) => Object
            .values(TextColor)
            .includes(value),
    }) readonly color?: TextColor;

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
        default: TextTag.SPAN,
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

    get textClasses() {
        return {
            [`gm-text--${this.size}`]: this.size,
            [`gm-text--${this.color}`]: this.color,
            [`gm-text--${this.weight}`]: this.weight,
            'gm-text--break-word': this.breakWord,
            'gm-text--text-overflow': this.textOverflow,
        };
    }
}
</script>

<style lang="less">

.gm-text {
    color: var(--gm-colors-black);

    &--regular {  font-weight: var(--gm-font-weight-regular); }
    &--medium {  font-weight: var(--gm-font-weight-medium); }
    &--semibold {  font-weight: var(--gm-font-weight-semibold); }
    &--bold { font-weight: var(--gm-font-weight-bold); }
    &--dark { color: var(--gm-colors-black-alpha-800); }
    &--light { color: var(--gm-colors-black-alpha-600); }
    &--lighter { color: var(--gm-colors-black-alpha-400); }
    &--success { color: var(--gm-colors-success); }
    &--primary { color: var(--gm-colors-primary); }
    &--accent { color: var(--gm-colors-accent); }
    &--warning { color: var(--gm-colors-warning); }
    &--error { color: var(--gm-colors-error); }
    &--danger { color: var(--gm-colors-danger); }
    &--white { color: var(--gm-colors-white); }
    &--xxs { font-size: var(--gm-font-size-xxs); }
    &--xs {  font-size: var(--gm-font-size-xs); }
    &--sm {  font-size: var(--gm-font-size-sm); }
    &--md { font-size: var(--gm-font-size-md); }
    &--lg { font-size: var(--gm-font-size-lg); }
    &--xl { font-size: var(--gm-font-size-xl); }
    &--xxl { font-size: var(--gm-font-size-xxl); }
    &--break-word { word-break: break-word; }
    &--text-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
