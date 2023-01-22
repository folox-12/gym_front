import { Component, Vue } from 'vue-property-decorator';

@Component
export default class getCurrentId extends Vue {
    currentId: number = Number(this.$route.params.id);

    // eslint-disable-next-line class-methods-use-this
    // validate(ctx: Context) {
    //     const { id: pageId } = ctx.params;
    //     return isNumber(pageId);
    // }
}

