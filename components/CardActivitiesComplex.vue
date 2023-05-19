<template>
    <base-card
        :title="title"
        :description="description"
        :show-title-button="$auth.loggedIn"
        :title-icon="icons"
        @titleButtonAction="actionWithComplex"
        @click="open"
        @open="open"
    >
        <div :class="$style.container">
            <div v-for="(item, index) in porperties" :key="index">
                <template v-if="item.show">
                    <base-icon :path="item.icon" />
                    <base-text>
                        {{ item.text }}
                    </base-text>
                </template>
            </div>
        </div>
    </base-card>
</template>
<script lang="ts">
import {
    Vue, Component, Prop, Emit,
} from 'vue-property-decorator';
import {
    BaseText, BaseIcon, BaseButton, BaseCard,
} from '~/components/base';
import {
    mdiAccountCircle, mdiCalendarClock, mdiEmailOutline, mdiPlusBox, mdiMinusBox,
} from '@mdi/js';

@Component({
    components: {
        BaseText,
        BaseIcon,
        BaseButton,
        BaseCard,
    },
})
export default class CardActivitiesComplex extends Vue {
    @Prop({
        type: String,
        required: false,
        default: '',
    })
    readonly authorName!: string;

    @Prop({
        type: String,
        required: true,
    })
    readonly authorEmail!: string;

    @Prop({
        type: String,
        required: true,
    })
    readonly dateCreation!: string;

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
    readonly isSubscribed?: boolean;

    porperties = {
        author: {
            icon: mdiAccountCircle,
            text: this.authorName,
            show: !!this.authorName,
        },

        email: {
            icon: mdiEmailOutline,
            text: this.authorEmail,
            show: true,
        },

        date: {
            icon: mdiCalendarClock,
            text: this.$dayjs(this.dateCreation).format('DD.MM.YYYY'),
            show: true,
        },
    };

    get icons() {
        return this.isSubscribed ? mdiMinusBox : mdiPlusBox;
    }

    actionWithComplex() {
        if (this.isSubscribed) {
            return this.unsubscribeFromComplex();
        }

        return this.subscribeToComplex();
    }

    // eslint-disable-next-line class-methods-use-this
    @Emit('subscribeToComplex')
    subscribeToComplex() {}

    // eslint-disable-next-line class-methods-use-this
    @Emit('unsubscribeFromComplex')
    unsubscribeFromComplex() {}

    // eslint-disable-next-line class-methods-use-this
    @Emit('routeToComplex')
    open() {}
}
</script>

<style lang="less" module>
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    gap: 5px 0;
}
</style>
