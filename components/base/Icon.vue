<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :viewBox="viewBox"
        :aria-labelledby="iconName"
        role="presentation"
        class="svg-icon"
        :class="iconClasses"
        v-on="$listeners"
    >
        >
        <title
            v-if="iconName"
            :id="iconName"
        >
            {{ iconName }}
        </title>
        <g>
            <template
                v-if="path"
            >
                <path :d="path" />
            </template>
            <slot v-esle />
        </g>
    </svg>
</template>

<script lang="ts">
import {
    Vue, Component, Prop, Watch,
} from 'vue-property-decorator';

const ICON_COLORS = {
    default: 'default',
    black: 'black',
    dark: 'dark',
    lightDark: 'light-dark',
    white: 'white',
    warning: 'warning',
    error: 'error',
    danger: 'danger',
    primary: 'primary',
    success: 'success',
    basic: 'basic',
} as const;

const DEFAULT_VIEWBOX = '0 0 24 24';

const BASE_CLASS = 'svg-icon';

const DEFAULT_SIZE = {
    width: 24,
    height: 24,
};

type IconClassHash = {
    [x: string]: boolean;
};

@Component
export default class BaseIcon extends Vue {
    @Prop({
        type: String,
        default: undefined,
    }) readonly iconName?: string;

    @Prop({
        default: DEFAULT_SIZE.width,
    }) readonly width!: number | string;

    @Prop({
        default: DEFAULT_SIZE.height,
    })readonly height!: number | string;

    @Prop({
        default: ICON_COLORS.default,
    }) readonly color!: string;

    @Prop({
        default: false,
    }) readonly reverted!: boolean;

    @Prop({
        default: DEFAULT_VIEWBOX,
    }) readonly viewBox!: string;

    @Prop({
        type: String,
        default: undefined,
    }) readonly path?: string;

    @Prop({
        type: Boolean,
        default: false,
    }) readonly left!: boolean;

    @Prop({
        type: Boolean,
        default: false,
    }) readonly right!: boolean;

    iconClasses: IconClassHash = this.getIconClasses();

    getIconClasses(): IconClassHash {
        return {
            [`${BASE_CLASS}--default`]: this.color === ICON_COLORS.default,
            [`${BASE_CLASS}--black`]: this.color === ICON_COLORS.black,
            [`${BASE_CLASS}--dark`]: this.color === ICON_COLORS.dark,
            [`${BASE_CLASS}--light-dark`]: this.color === ICON_COLORS.lightDark,
            [`${BASE_CLASS}--white`]: this.color === ICON_COLORS.white,
            [`${BASE_CLASS}--warning`]: this.color === ICON_COLORS.warning,
            [`${BASE_CLASS}--error`]: this.color === ICON_COLORS.error,
            [`${BASE_CLASS}--danger`]: this.color === ICON_COLORS.danger,
            [`${BASE_CLASS}--primary`]: this.color === ICON_COLORS.primary,
            [`${BASE_CLASS}--success`]: this.color === ICON_COLORS.success,
            [`${BASE_CLASS}--basic`]: this.color === ICON_COLORS.basic,
            [`${BASE_CLASS}--reverted`]: this.reverted,
            [`${BASE_CLASS}--left`]: this.left,
            [`${BASE_CLASS}--right`]: this.right,
        };
    }

    @Watch('color')
    @Watch('reverted')
    updateIconClasses() {
        this.iconClasses = this.getIconClasses();
    }
}
</script>

<style lang="less">

.svg-icon {
    &--default {
        fill: var(--gm-colors-black-alpha-600);
    }

    &--faded {
        fill: var(--gm-colors-black-alpha-200);
    }

    &--light-dark {
        fill: var(--gm-colors-black-alpha-400);
    }

    &--dark {
        fill: var(--gm-colors-black-alpha-800);
    }

    &--black {
        fill: var(--gm-colors-black);
    }

    &--accent {
        fill: var(--gm-colors-accent);
    }
    &--white {
        fill: var(--gm-colors-white);
    }

    &--warning {
        fill: var(--gm-colors-warning);
    }

    &--error {
        fill: var(--gm-colors-error);
    }

    &--danger {
        fill: var(--gm-colors-danger);
    }

    &--primary {
        fill: var(--gm-colors-primary);
    }

    &--success {
        fill: var(--gm-colors-success);
    }

    &--basic {
        fill: var(--gm-colors-primary);
    }

    &--reverted {
        transform: rotate(180deg);
    }

    &--right {
        margin-left: 8px
    }

    &--left {
        margin-right: 8px
    }
}
</style>
