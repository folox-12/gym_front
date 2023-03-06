<template>
    <div
        class="gm-input"
        :class="[
            {
                [`gm-input--${variant}`]: variant,
                'gm-input--faded': faded,
                'gm-input--invalid': invalid,
                'gm-input--focused': focused,
            },
            inputClasses
        ]"
        @click="input.focus()"
    >
        <input
            v-if="isInput"
            ref="input"
            v-mask="mask"
            :value="computedValue"
            :type="typeInput"
            v-bind="$attrs"
            :disabled="disabled"
            v-on="listeners"
        >

        <textarea
            v-else
            ref="input"
            :value="computedValue"
            type="textarea"
            v-bind="$attrs"
            :disabled="disabled"
            v-on="listeners"
        />

        <span
            v-if="iconRight"
            class="gm-input__icon gm-input__icon--right"
            :class="{'gm-input__icon gm-input__icon--action':rightIconAction}"
        >
            <base-icon
                v-if="rightIconAction"
                :height="iconSize"
                :width="iconSize"
                :path="iconRight"
                :color="iconColor"
                @click.prevent="rightIconAction"
            />
        </span>

        <span
            v-if="$slots.icon"
            class="gm-input__icon gm-input__icon--right"
        >
            <slot name="icon" />
        </span>
    </div>
</template>
<script lang="ts">
import {
    Vue, Component, Prop, Emit, Watch, Ref,
} from 'vue-property-decorator';

import { BaseButton, BaseIcon } from '~/components/base/';

enum InputField {
    INPUT = 'input',
    TEXTAREA = 'textarea',
}

enum InputVariant {
    DEFAULT = 'default',
    FADED = 'faded',
}

@Component({
    inheritAttrs: false,
    name: 'BaseInput',
    components: {
        BaseIcon,
        BaseButton,
    },
})
export default class Input extends Vue {
    @Ref('input')
        input!: HTMLInputElement;

    @Prop({
        type: String as () => InputField,
        default: InputField.INPUT,
        validator: (input: InputField) => [
            InputField.INPUT,
            InputField.TEXTAREA,
        ].includes(input),
    }) readonly as!: InputField;

    @Prop({
        type: String as () => InputVariant,
        default: undefined,
        validator: (value: InputVariant) => Object
            .values(InputVariant)
            .includes(value),
    }) readonly variant?: InputVariant;

    @Prop({
        type: Boolean,
        default: false,
    }) readonly disabled!: boolean;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly required!: boolean;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly invalid!: boolean;

    @Prop({
        type: String,
        default: undefined,
    })
    readonly errorMessage?: string;

    @Prop({
        type: String,
        default: 'text',
    })
    readonly typeInput?: string;

    @Prop({
        type: String,
        default: '',
    })
    readonly inputClasses?: string;

    @Prop({
        type: [String, Number],
        default: '',
    })
    readonly value!: string | number | null;

    @Prop({
        type: Number,
        default: undefined,
    })
    readonly minValue?: number;

    @Prop({
        type: Number,
        default: undefined,
    })
    readonly maxValue?: number;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly lazy!: Boolean;

    @Prop({
        type: [Array, String],
        default: '',
    })
    readonly mask!: string | any[];

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly faded?: boolean;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly large!: boolean;

    @Prop({
        type: String,
        default: undefined,
    })
    readonly iconRight?: string;

    @Prop({
        type: [String, Number],
        default: undefined,
    })
    readonly iconSize?: string | number;

    @Prop({
        type: String,
        default: undefined,
    })
    readonly iconColor?: string;

    @Prop({
        type: Function,
        default: undefined,
    }) readonly rightIconAction?: (...args: any) => any;

    focused = false;

    newValue: Input['value'] = this.value;

    get isInput() {
        return this.as === InputField.INPUT;
    }

    get computedValue() {
        return this.newValue;
    }

    set computedValue(value) {
        this.newValue = value;
        this.$emit('input', value);
    }

    get listeners() {
        return {
            ...this.$listeners,
            input: this.onInput,
            change: this.onChange,
            focus: this.onFocus,
            blur: this.onBlur,
        };
    }

    @Watch('value')
    watchValue(value: Input['value']) {
        // small hack dueo to v-mask cant update itself if
        // symbols length is equal
        if (
            this.mask && this.mask !== ''
            && this.newValue?.toString().length !== value?.toString().length
        ) {
            this.newValue = '';

            this.$nextTick(() => {
                this.newValue = value;
            });
        } else {
            this.newValue = value;
        }
    }

    onInput(event: Event) {
        if (!this.lazy) {
            const target = event.target as HTMLInputElement;
            this.updateValue(target.value);
        }
    }

    // works only if input is lazy, duo to v-model priority functional, cuased by v-mask work
    onChange(event: Event) {
        if (this.lazy) {
            const target = event.target as HTMLInputElement;
            this.updateValue(target.value);
        }
    }

    updateValue(value: string) {
        if (
            this.maxValue === undefined
            && this.minValue === undefined
        ) {
            this.computedValue = value;
            return;
        }

        const numberValue = Number(value);

        if (
            this.minValue !== undefined
            && (Number.isNaN(numberValue) || numberValue < this.minValue)
        ) {
            this.computedValue = Number(this.minValue);
        } else if (
            this.maxValue !== undefined
            && (Number.isNaN(numberValue) || numberValue > this.maxValue)
        ) {
            this.computedValue = Number(this.maxValue);
        } else {
            this.computedValue = numberValue;
        }
    }

    @Emit('focus')
    onFocus(event: FocusEvent) {
        this.focused = true;
        return event;
    }

    @Emit('blur')
    onBlur(event: FocusEvent) {
        this.focused = false;
        return event;
    }

    focus() {
        this.input.focus();
    }
}
</script>

<style lang="less">

.gm-input {
    display: inline-flex;
    position: relative;
    max-width: 100%;
    width: 100%;

    input, textarea {
        max-width: 100%;
        width: 100%;
        height: auto;
        padding: 10px 10px 10px 16px;
        box-shadow: var(--gm-shadow-general-box);
        border: 1px solid transparent;
        color: var(--gm-colors-black-alpha-800);
        font-size: 16px;
        transition: border-color .25s ease, box-shadow .25s ease;
        background-origin: border-box;

        &[disabled] {
            cursor: default;
            border-color: transparent;
        }

        &:hover:not([disabled]) {
            border-color: var(--gm-main-colorfull-background-color);
        }

        &:focus {
            border-color: var(--gm-main-colorfull-background-color)!important;
            box-shadow: 0 0 0 4px var(--gm-shadow-general-box);
        }

        &::placeholder {
            color: var(--gm-colors-black-alpha-800);
        }
    }

    textarea {
        resize: vertical;
    }

    &__icon {
        display: flex;
        position: absolute;
        height: 100%;
        top: 50%;
        transform: translate(0, -50%);
        align-items: center;

        &--action {
            cursor: pointer;
        }

        &--right {
            right: 0;
            padding-right: 12px;
        }
    }

    &--invalid {
        input, textarea {
            border-color: var(--gm-colors-error)!important;
            box-shadow: 0 0 0 4px var(--gm-shadow-general-box);
        }
    }

    &--faded {
        input, textarea {
            box-shadow: none!important;
        }
    }
}
</style>
