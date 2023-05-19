<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { BaseContainer, BaseText } from '~/components/base';

export default defineComponent({
    components: {
        BaseContainer,
        BaseText,
    },

    props: {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: false,
            default: '',
        },

        dark: {
            type: Boolean,
            default: false,
        },

        textLeft: {
            type: Boolean,
            default: false,
        },

        image: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        return {
            props,
        };
    },
});
</script>

<template>
    <section
        :class="{
            [$style.landing]: true,
            [$style.dark]: dark,
            [$style.left]: textLeft,
        }"
    >
        <base-container :class="$style.container">
            <div :class="$style.content">
                <div :class="$style.image">
                    <img :src="props.image" lazy>
                </div>
                <div :class="$style.info">
                    <base-text
                        as="div"
                        weight="bold"
                        :class="$style.title"
                    >
                        {{ props.title }}
                    </base-text>
                    <base-text
                        v-if="description"
                        as="div"
                        color="light"
                        :class="$style.description"
                    >
                        {{ props.description }}
                    </base-text>
                </div>
            </div>
        </base-container>
    </section>
</template>

<style lang="less" module>
    .landing {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
            background-image: url('/img/landing/white.png');
            background-position: center;

        &.dark {
            background-image: url('/img/landing/dark.png');
            background-position: center;

            .title {
                color: var(--gm-colors-white);
            }

            .description {
                color: var(--gm-colors-white-alpha-800)
            }
        }

        &.left {
            .image {
                order: 2;
            }
        }
    }

    .container {
        min-height: 100%;
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        padding: 5px;
    }

    .image {
        position: relative;
        flex: 0 1 50%;
        height: 675px;

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .info {
        flex: 1 0 50%;
        display: flex;
        gap: 5px;
        flex-direction: column;
    }

    .title {
        font-size: 64px;
        line-height: 90%;
        margin-bottom: 10px;
    }

@media screen and (max-width: @md) {
    .landing {
        min-height: 100vh;
    }

    .content {
        padding-top: 15px;
        flex-direction: column;
        gap: 15px;
    }

    .info {
        text-align: center;
    }

    .image {
        order: 2 !important;
        flex: 1 1 250px;
        width: 100%;
    }
        .title {
            font-size: 24px;
        }
     }
</style>
