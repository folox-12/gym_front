<template>
    <div class="home-page">
        <base-text>
            Time-out
        </base-text>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { BaseText } from '~/components/base/'
import redirectAuthorizated from '~/middleware/redirectAuthorizated';

Component.registerHooks(['head']);
@Component({
    components: {
        BaseText,
    },
    middleware: [redirectAuthorizated],
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
