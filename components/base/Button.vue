<template>
    <component
        :is="as"
        v-bind="$attrs"
        class="gm-button"
        :class="textClasses"
        :disabled="loading"
        v-on="$listeners"
    >
        <div v-if="loading">
            <loader
                :width="width"
                :height="20"
            />
        </div>
        <div v-else>
            <slot>
                {{ text }}
            </slot>
        </div>
    </component>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Loader from '~/components/base/Loader.vue';

enum TextTag {
    A = 'a',
    BUTTON = 'button',
    NUXT = 'nuxt-link',
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

enum Variant {
    DEFAULT = 'default',
    SIMPLE = 'simple',
    UNSTYLE = 'unstyle',
}

@Component({
    components: {
        Loader,
    },
})
export default class Button extends Vue {
    @Prop({
        type: String as () => TextSize,
        default: TextSize.MD,
        validator: (value: TextSize) => Object.values(TextSize).includes(value),
    })
    readonly size!: TextSize;

    @Prop({
        type: String as () => TextWeight,
        default: undefined,
        validator: (value: TextWeight) => Object.values(TextWeight).includes(value),
    })
    readonly weight?: TextWeight;

    @Prop({
        type: String as () => TextTag,
        default: TextTag.BUTTON,
        validator: (value: TextTag) => Object.values(TextTag).includes(value),
    })
    readonly as!: TextTag;

    @Prop({
        type: String as () => TextTag,
        default: Variant.DEFAULT,
        validator: (value: Variant) => Object.values(Variant).includes(value),
    })
    readonly variant!: TextTag;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly breakWord!: boolean;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly loading?: boolean;

    @Prop({
        type: Number,
        default: 20,
    })
    readonly width?: number;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly textOverflow!: boolean;

    @Prop({
        type: String,
        required: false,
    })
    readonly text?: string;

    get textClasses() {
        return {
            [`gm-button--${this.variant}`]: this.variant,
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
button.gm-button,
nuxt-link.gm-button {
    color: var(--gm-colors-white);
    border: 1px solid var(--gm-colors-primary);
    border-radius: var(--gm-border-radius);
    background: var(--gm-main-gradient-background);
    padding: 5px 8px;
    cursor: pointer;

    &[disabled] {
        cursor: default;
        color: var(--gm-colors-white-alpha-400);
        border-color: var(--gm-colors-warning);
    }

    &:not([disabled]):hover {
        box-shadow: var(--gm-shadow-general-box);
        color: var(--gm-colors-white-alpha-800);
    }

    &:active {
        transform: scale(.8);
    }

    &--simple {
        color: var(--gm-colors-black);
        border-radius: 0;
        border: 1px solid var(--gm-colors-black);
        background: var(--gm-colors-white);

        &[disabled] {
            cursor: default;
            color: var(--gm-colors-white-alpha-400);
            border-color: var(--gm-colors-warning);
        }

        &:not([disabled]):hover {
            box-shadow: var(--gm-shadow-general-box);
            color: var(--gm-colors-light-blue);
            border-color: var(--gm-colors-light-blue);
        }
    }

    &--unstyle {
        color: var(--gm-colors-black);
        border-radius: 0;
        background: none;
        border: none;

        &[disabled] {
            cursor: default;
            color: var(--gm-colors-white-alpha-400);
        }

        &:not([disabled]):hover {
            box-shadow: none;
            color: var(--gm-colors-light-blue);
        }
    }

    &--bold {
        font-weight: var(--gm-font-weight-bold);
    }

    &--xxs {
        font-size: var(--gm-font-size-xxs);
    }

    &--xs {
        font-size: var(--gm-font-size-xs);
    }

    &--sm {
        font-size: var(--gm-font-size-sm);
    }

    &--md {
        font-size: var(--gm-font-size-md);
    }

    &--lg {
        font-size: var(--gm-font-size-lg);
    }

    &--xl {
        font-size: var(--gm-font-size-xl);
    }

    &--break-word {
        word-break: break-word;
    }
}
</style>
