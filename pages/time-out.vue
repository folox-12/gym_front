<template>
    <div class="home-page">
        <base-text>

        </base-text>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { BaseText } from '~/components/base/'
import authorizated from '~/middleware/auth';

Component.registerHooks(['head']);
@Component({
    name: "timeOut",
    components: {
        BaseText,
    },
    middleware: [authorizated],
})
export default class homePage extends Vue {
    header = 'Ваша сессия истекла';

    head() {
        return {
            title: this.header,
            };
        }


}
</script>

<style lang="less">
</style>