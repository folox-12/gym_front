<template>
    <base-container>
            <client-only>
        <div :class="$style.container">
                <div v-for="(item, index) in nextPreviousNumbers" :key="index">
                    <a
                        :class="{
                            [$style.pagginationLink]: true,
                            [$style.active]: item.num === perPage,
                            [$style.start]: item?.class === 'start',
                            [$style.end]: item?.class === 'end',
                        }"
                        @click="onPageChange(item.num)"
                    >
                        <base-icon v-if="item.text" :path="item.text" />
                        <span v-else>
                            {{ item.num }}
                        </span>
                    </a>
                </div>
        </div>
            </client-only>
        <div :class="$style.total">Найдено всего {{ totalCount }}</div>
    </base-container>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { BaseContainer, BaseIcon } from "~/components/base";
import { DEFAULT_PAGE_SIZE } from "~/constants/general";
import { mdiArrowLeftBold, mdiArrowRightBold } from "@mdi/js";

@Component({
    components: {
        BaseContainer,
        BaseIcon,
    },
})
export default class Paggination extends Vue {
    @Prop({
        type: Number,
        default: 1,
    })
    readonly perPage!: number;

    @Prop({
        type: Number,
        default: DEFAULT_PAGE_SIZE,
    })
    readonly sizePage!: number;

    @Prop({
        type: Number,
        default: 0,
    })
    readonly totalCount!: number;

    @Prop({
        type: Function,
        default: () => null,
    })
    readonly updatePage!: (...args: any) => any;

    get nextPreviousNumbers() {
        const totalPages = Math.round(this.totalCount / this.sizePage);
        const countOfViewNum = [...new Array(3)];
        let numbers = [];
        if (this.perPage > 1) {
            numbers.push({
                num: this.perPage - 1,
                text: mdiArrowLeftBold,
                class: "start",
            });
        }

        countOfViewNum.forEach((el, index) => {
            const num = index + 1;

            if (this.perPage - num >= 1 && num !== 0) {
                const value = countOfViewNum.length - this.perPage + num;
                numbers.push({
                    num: value === this.perPage ? value - 1 : value,
                });
            }
        });

        numbers.push({
            num: this.perPage,
        });

        countOfViewNum.forEach((el, index) => {
            const num = index + 1;

            if (this.perPage + num <= totalPages && num !== 0) {
                numbers.push({ num: this.perPage + num });
            }
        });

        if (totalPages > this.perPage) {
            numbers.push({
                num: this.perPage + 1,
                text: mdiArrowRightBold,
                class: "end",
            });
        }
        return numbers;
    }

    @Emit("updatePage")
    onPageChange(page: number) {}
}
</script>

<style lang="less" module>
.container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    position: relative;
}

a.paggination-link {
    text-decoration: none;
    display: block;
    padding: 10px;
    width: 44px;
    height: 44px;
    text-align: center;
    cursor: pointer;
    border-radius: 100%;
    background-color: var(--gm-colors-white);
    color: var(--gm-main-colorfull-background-color);
}

.active {
    color: var(--gm-colors-white) !important;
    background-color: var(--gm-main-colorfull-background-color) !important;
    cursor: default !important;

    &:hover {
        color: var(--gm-colors-white);
        box-shadow: 10px 10px var(--gm-colors-black-alpha-20);
    }
}
.total {
    margin-top: 10px;
    color: var(--gm-colors-black-alpha-400);
    text-align: center;
}
.end {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
}
.start {
    position: absolute;
    display: flex;
    align-items: center;
    left: 0;
}
</style>
