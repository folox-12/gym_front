<template>
    <div class="home-page">
        <base-container>
            <base-text>
                Ваша сессия истекла. Авторизируйтесь ещё раз.
            </base-text>
        </base-container>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { BaseText, BaseContainer } from '~/components/base/'
import redirectAuthorizated from '~/middleware/redirectAuthorizated';

Component.registerHooks(['head']);
@Component({
    components: {
        BaseText,
        BaseContainer,
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
