<template>
    <div>
        <gym-title>
            Личный профиль
        </gym-title>
        <base-message v-if="!profileData.is_activated" type="warning">
            Для получение полного функционала сайта, активируйте аккаунт по почте!
        </base-message>
        <base-container :class="$style.info">
            <div :class="$style.left">
                <form-row title="Почта">
                    <base-text>
                        {{ profileData.email }}
                    </base-text>
                </form-row>
                <form-row title="ФИО">
                    <base-text>
                        {{ name || "Не заполнено" }}
                    </base-text>
                    <base-button
                        variant="unstyle"
                        @click="editNameModal.show=true"
                    >
                        <base-icon color="basic" :path="icons.editName" />
                    </base-button>
                </form-row>
            </div>
        </base-container>
        <edit-name-modal
            ref="editNameModal"
            :profile-data="profileData"
            @close="editNameModal.show = false"
            @confirm="updateProfileInfo"
        />
    </div>
</template>
<script lang="ts">
import {
    Component, Vue, Ref,
} from 'vue-property-decorator';
import {
    BaseContainer, BaseText, BaseMessage, BaseIcon,
} from '~/components/base';
import { getFullNameFromNameAndSurname } from '~/utils/general';
import { FormRow } from '~/components/form/';
import CardContainer from '~/components/CardContainer.vue';
import CardActivitiesComplex from '~/components/CardActivitiesComplex.vue';
import { mdiAccountEdit } from '@mdi/js';
import GymTitle from '~/components/Title.vue';
import { mapState, mapActions } from 'pinia';
import { useProfileStore } from '~/pinia-store/useProfileStore';
import EditNameModal from './EditNameModal.vue';

const Mappers = Vue.extend({
    computed: {
        ...mapState(useProfileStore, ['profile']),
    },
    methods: {
        ...mapActions(useProfileStore, ['getProfileInformation']),
    },
});

@Component({
    components: {
        GymTitle,
        BaseContainer,
        BaseText,
        BaseIcon,
        FormRow,
        BaseMessage,
        CardContainer,
        CardActivitiesComplex,
        EditNameModal,
    },
})
export default class ProfileInfo extends Mappers {
    @Ref('editNameModal') editNameModal!: typeof EditNameModal;

    icons = {
        editName: mdiAccountEdit,
    };

    get profileData() {
        return this.profile.data;
    }

    get name() {
        return getFullNameFromNameAndSurname(
            this.profileData?.name || null,
            this.profileData?.surname || null,
        );
    }

    async fetchInfo() {
        await this.getProfileInformation();
    }

    async updateProfileInfo() {
        await this.fetchInfo();
        this.editNameModal.show = false;
    }
}
</script>

<style lang="less" module>
.info {
    padding: 15px;
    background-color: #fff;
    display: flex;
    gap: 5px;
    box-shadow: var(--gm-shadow-general-box);
}

.left {
    flex: 0 1 30%;
}

</style>
