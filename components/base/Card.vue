<template>
    <div :class="$style.container">
        <div :class="$style.title">
            <base-text
                :class="$style.titleText"
                size="xl"
                weight="bold"
                color="dark"
                text-transform="uppercase"
            >
                {{ title }}
            </base-text>

            <div v-if="showTitleButton" :class="$style.icon">
                <base-button v-if="titleIcon" as="a" @click="titleButtonAction">
                    <base-icon
                        :path="titleIcon"
                        color="basic"
                        width="35"
                        height="35"
                    />
                </base-button>
            </div>
        </div>
        <div :class="$style.subtitle">
            <base-text size="lg" weight="bold" color="lighter" :class="$style.subtitleText">
                {{ description }}
            </base-text>
        </div>
        <slot />
        <div :class="$style.hide">
            <base-button
                :class="$style.open"
                @click="open"
            >
                Открыть
            </base-button>
        </div>
    </div>
</template>
<script lang="ts">
import {
    Vue, Component, Prop, Emit,
} from 'vue-property-decorator';
// eslint-disable-next-line import/no-cycle
import { BaseText } from '~/components/base';

@Component({
    components: {
        BaseText,
    },
})
export default class Card extends Vue {
    @Prop({
        type: String,
        required: true,
    })
    readonly title!: string;

    @Prop({
        type: String,
        required: true,
    })
    readonly description!: string;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly showTitleButton!: boolean;

    @Prop({
        type: Boolean,
        default: true,
    })
    readonly showOpenButton!: boolean;

    @Prop({
        type: String,
    })
    readonly titleIcon?: string;

    // eslint-disable-next-line class-methods-use-this
    @Emit('titleButtonAction')
    titleButtonAction() {}

    // eslint-disable-next-line class-methods-use-this
    @Emit('open')
    open() {}
}
</script>

<style lang="less" module>
.container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 10px;
    background-color: #fff;

    &:hover {
        box-shadow: var(--gm-shadow-general-box);

        .hide {
            display: block;
        }
    }
}

.title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    &-text {
        word-break: break-all;
    }
}

.subtitle {
    margin-bottom: 10px;
    flex-grow: 1;

    &-text {
        word-break: break-all;
    }
}

.hide {
    display: none;
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.icon {
    &:hover {
        box-shadow: var(--gm-shadow-general-box);
    }
}
</style>
