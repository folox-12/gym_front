<template>
    <div
        class="gm-rating"
        :class="{
            [$style.readonly]: readonly,
        }"
    >
        <base-button
            variant="unstyle"
            v-for="(star, index) in stars"
            :key="index"
            :disabled="readonly"
            :title="star.value"
            @mouseenter="setColor(star.value)"
            @mouseleave="unsetColor(star.value)"
            @click="update(star.value)"
        >
            <div :class="$style.star">
                <span v-if="!readonly">{{ star.value }}</span>
                <base-icon :path="icon" :color="star.color" />
            </div>
        </base-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { BaseButton, BaseIcon } from "~/components/base";
import { mdiStar } from "@mdi/js";

@Component({
    components: {
        BaseButton,
        BaseIcon,
    },
})
export default class Rating extends Vue {
    @Prop({
        type: Number,
        default: 1,
    })
    readonly value?: number;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly readonly?: boolean;

    icon = mdiStar;

    stars = [...Array(5).keys()].map((el) => {
        return {
            value: el + 1,
            color:
                this.value && this.value >= el + 1 ? "warning" : "light-dark",
        };
    });

    setColor(id: number) {
        if (!this.readonly) {
            this.stars = this.stars.map((el) => {
                if (el.value <= id) {
                    return {
                        ...el,
                        color: "warning",
                    };
                }
                return el;
            });
        }
    }
    unsetColor(id: number) {
        if (!this.readonly) {
            this.stars = this.stars.map((el) => {
                if (el.value <= id && this.value && this.value < el.value) {
                    return {
                        ...el,
                        color: "light-dark",
                    };
                }
                return el;
            });
        }
    }

    @Emit("update")
    update(value: number) {
        if (this.readonly) {
            return false;
        }

        return value;
    }
}
</script>
<style lang="less" module>
.rating {}
.star {
    display: flex;
    flex-direction: column-reverse;
}
.readonly {
}
</style>
