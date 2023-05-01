<template>
    <base-container :class="$style.info">
        <div :class="$style.left">
            <base-text as="div" size="lg">
                {{ name }}
            </base-text>
            <base-text>
                {{ $auth.user.email }}
            </base-text>
        </div>
        <div :class="$style.right">
            <ProfileCard>
                <card-container>
                    <card-activities-complex
                        v-for="(activity, index) of complexes"
                        :key="index"
                        :title="activity.title"
                        :description="activity.description"
                        :authorName="
                            getFullName(
                                activity.author.name,
                                activity.author.surname
                            )
                        "
                        :authorEmail="activity.author.email"
                        :dateCreation="activity.date_creation"
                        :is-subscribed="true"
                        @unsubscribeFromComplex="
                            unsubscribeFromProfile(activity.id_activities_complex)
                        "
                        @routeToComplex="
                            routeToComplex(activity.id_activities_complex)
                        "
                    />
                </card-container>
            </ProfileCard>
        </div>
    </base-container>
</template>
<script lang="ts">
import { Vue, Component, Prop, Mixins, Emit } from "vue-property-decorator";
import { BaseContainer, BaseText } from "~/components/base";
import { getFullNameFromNameAndSurname } from "~/utils/general";
import { FormRow } from "~/components/form/";
import { ActivitiesComplexWithActivities } from "~/types/ActivitiesComplex";
import CardContainer from "~/components/CardContainer.vue";
import CardActivitiesComplex from "~/components/CardActivitiesComplex.vue";
import TraningsCardMixin from "~/components/mixins/TraningCard";
import { mdiCalendarClock } from "@mdi/js"

@Component({
    components: {
        BaseContainer,
        BaseText,
        FormRow,
        CardContainer,
        CardActivitiesComplex,
    },
})
export default class ProfileInfo extends Mixins(TraningsCardMixin) {
    @Prop({
        type: Array as () => ActivitiesComplexWithActivities[],
    })
    complexes?: ActivitiesComplexWithActivities[];
    dataIcon = mdiCalendarClock;
    get name() {
        return this.$auth.user && this.$auth.user.name
            ? getFullNameFromNameAndSurname(
                  (this.$auth.user.name as string) || undefined,
                  (this.$auth.user.surname as string) || undefined
              )
            : this.$auth.user!.email;
    }
    async unsubscribeFromProfile(id: number | string) {
        await this.unsubscribe(id);
        if (!this.isUnsubscribed.error) {
            this.updateInfo();
        }
    }

    @Emit("updateInfo")
    updateInfo() {}
}
</script>

<style lang="less" module>
.info {
    padding: 15px;
    background-color: #fff;
    display: flex;
    gap: 5px;
}

.left {
    flex: 0 1 30%;
}

.right {
    flex: 1 1 auto;
}
</style>
