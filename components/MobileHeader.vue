<script lang="ts">
import { mdiWindowClose } from '@mdi/js';
import {
    defineComponent, ref, useContext, watch, onBeforeMount, onBeforeUnmount,
} from '@nuxtjs/composition-api';
import { BaseText, BaseButton, BaseIcon } from '~/components/base';
import { SCREEN_SIZE } from '~/utils/general';

export default defineComponent({
    components: {
        BaseText,
        BaseButton,
        BaseIcon,
    },

    props: {
        elements: {
            type: Array,
            required: true,
        },
    },

    setup(props, { expose }) {
        const isOpen = ref(false);
        const { app: { router } } = useContext();
        const currentWidth = ref(0);

        watch(currentWidth, (newValue: number) => {
            if (newValue > SCREEN_SIZE.LG && isOpen.value) {
                isOpen.value = false;
            }
        });

        const changeWidth = () => {
            currentWidth.value = document.documentElement.clientWidth;
        };

        const routeToLink = (line: string, close = false) => {
            if (router) router.push(line);
            if (close) isOpen.value = false;
        };

        onBeforeMount(() => {
            window.addEventListener('resize', changeWidth);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', changeWidth);
        });

        expose({
            isOpen,
        });

        return {
            isOpen,
            props,
            mdiWindowClose,
            routeToLink,
        };
    },
});
</script>

<template>
    <portal v-if="isOpen" to="mobile">
        <div :class="$style.wrapper">
            <div :class="$style.closeIcon">
                <base-button
                    variant="unstyle"
                    @click="isOpen=false"
                >
                    <base-icon
                        :path="mdiWindowClose"
                    />
                </base-button>
            </div>
            <base-text size="xxl" as="div" weight="bold" :class="$style.title">
                Меню
            </base-text>
            <ul :class="$style.mobileMenu">
                <li
                    v-for="(item, index) in elements"
                    :key="index"
                >
                    <base-button
                        v-if="item.show"
                        size="lg"
                        variant="unstyle"
                        :class="$style.item"
                        @click="routeToLink(item.to, item.close)"
                    >
                        {{ item.name }}
                    </base-button>
                </li>
            </ul>
        </div>
    </portal>
</template>

<style lang="less" module>
.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    padding: 15px;
    background-color: #fff;
}

.title {
    text-align: center;
    margin-bottom: 25px;
}
.close-icon {
    text-align: right;
}

.mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.item {
    text-align: left;
}
</style>
