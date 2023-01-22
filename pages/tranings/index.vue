<template>
    <div class="traning">
        <base-message
            v-if="$auth.loggedIn && !$auth.user.isActivated" 
            type="warning"
        >
            <base-text 
            >
                Для получения полного доступа к функционалу приложения пожалуйста подтвердитe аккаунт на почте {{ $auth.user.email }}, а затем перезайдите в систему.
            </base-text>
        </base-message>
        <gym-title>
            Выбор спортивной программы
        </gym-title>
        {{ name }}
        <tranings-part />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TraningsPart from '~/components/parts/TraningsPart.vue';
import GymTitle from '~/components/Title.vue';
import { mapActions, mapState } from 'pinia';
import { useTraningsStore } from '~/pinia-store/traningsStore'

const Mappers = Vue.extend({
    computed: {
        ...mapState(useTraningsStore, ['name'])
    }
})
Component.registerHooks(['head']);
@Component({
    name: "traningPage",
    components: {
        TraningsPart,
        GymTitle,
    }
})
export default class homePage extends Mappers{
    header = 'Список программ - fitno'

    head() {
        return {
            title: this.header,
            };
        }


}
</script>
