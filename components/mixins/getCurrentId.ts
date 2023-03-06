import { Component, Vue } from 'vue-property-decorator';

@Component
export default class getCurrentId extends Vue {
    currentId: number = Number(this.$route.params.id);
}
