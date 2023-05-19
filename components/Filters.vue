<template>
    <base-container>
        <base-button :class="$style.openButton" @click="isOpen = !isOpen">
            <base-icon :path="searchIcon" color="white" />
        </base-button>
        <div :class="$style.filter">
            <div v-show="isOpen" :class="$style.leftSide">
                <div :class="$style.leftSideContent">
                    <keep-alive>
                        <div>
                            <base-input
                                v-model="search"
                                :placeholder="searchString"
                            />
                            <div :class="$style.buttons">
                                <base-button
                                    :class="$style.search"
                                    @click="updateSearchFilter()"
                                >
                                    Найти
                                </base-button>
                                <base-button
                                    :class="$style.search"
                                    :disabled="!search"
                                    @click="updateSearchFilter(true)"
                                >
                                    Очистить
                                </base-button>
                            </div>
                        </div>
                    </keep-alive>
                </div>
            </div>
            <div :class="$style.rightSide">
                <div v-if="loading" :class="$style.loading">
                    <base-loader />
                </div>
                <div v-else>
                    <div v-if="!total">
                        <base-text
                            :class="$style.empty"
                            as="div"
                            color="lighter"
                            size="xl"
                        >
                            Ничего не найдено
                        </base-text>
                    </div>
                    <div v-else>
                        <base-text
                            v-if="filters.search"
                            as="div"
                            color="light"
                            :class="$style.searchText"
                        >
                            <slot
                                name="searchText"
                                :search="filters.search"
                                :total="total"
                            >
                                По запросу {{ filters.search }} найдено
                                {{ total }} элементов
                            </slot>
                        </base-text>
                        <slot
                            :filters="filters"
                            :update-page="updatePageHandler"
                            :total="total"
                        />
                    </div>
                </div>
            </div>
        </div>
    </base-container>
</template>
<script lang="ts">
import {
    Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import {
    BaseContainer,
    BaseText,
    BaseLoader,
    BaseInput,
} from '~/components/base';
import { FiltersTypes } from '~/types/Filters';
import { useFiltersStore } from '~/pinia-store/useFiltersStore';
import { mapActions, mapState } from 'pinia';
import { mdiMagnify } from '@mdi/js';

const Mappers = Vue.extend({
    computed: {
        ...mapState(useFiltersStore, ['filters']),
    },

    methods: {
        ...mapActions(useFiltersStore, [
            'updatePagging',
            'updateSearch',
            'updatePaggingSize',
            'resetFilters',
        ]),
    },
});
Component.registerHooks(['fetch']);
@Component({
    components: {
        BaseContainer,
        BaseText,
        BaseLoader,
        BaseInput,
    },
})
export default class Filters extends Mappers {
    @Prop({
        type: Function,
        default: () => null,
    })
    readonly fetchData!: (...args: any) => any;

    @Prop({
        type: Object as () => FiltersTypes,
        default: undefined,
    })
    readonly defaultFilters!: FiltersTypes;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly loading?: boolean;

    @Prop({
        type: Number,
        default: 0,
    })
    readonly total?: number;

    @Prop({
        type: String,
        default: 'Поиск по названию',
    })
    readonly searchString?: string;

    search = '';

    updatePageHandlerValue = false;

    updateSearchValue = false;

    isOpen = false;

    searchIcon = mdiMagnify;

    updatePageHandler(page: number | null) {
        if (page && page !== this.filters.pagging) {
            this.updatePagging(page);
            this.updatePageHandlerValue = true;
        }
    }

    updateSearchFilter(clear = false) {
        if (clear) {
            this.search = '';
        }

        if (this.search !== this.filters.search) {
            this.updateSearch(this.search);
            this.updateSearchValue = true;
        }
    }

    @Watch('updateSearchValue')
    @Watch('updatePageHandlerValue')
    async refetchData(newVal: boolean, oldVal: boolean) {
        if (this.filters.search && !this.updatePageHandlerValue && newVal) {
            this.updatePagging(1);
        }

        if (!this.updatePageHandlerValue && !this.updateSearchValue) {
            return;
        }
        this.updatePageHandlerValue = false;
        this.updateSearchValue = false;
        await this.fetchData(this.filters);
    }

    created() {
        if (this.defaultFilters) {
            if (this.defaultFilters.search) {
                this.updateSearch(this.defaultFilters.search);
            }

            if (this.defaultFilters.paggingSize) {
                this.updatePaggingSize(this.defaultFilters.paggingSize);
            }
        }
    }

    beforeDestroy() {
        this.resetFilters();
    }

    async fetch() {
        if (this.fetchData != null) {
            await this.fetchData(this.filters);
        }
    }
}
</script>

<style lang="less" module>
.filter {
    display: flex;
    gap: 10px;
}

.right-side {
    flex: 1 1 60%;
}

.search-text {
    margin-bottom: 15px;
}

.open-button {
    margin-bottom: 30px;
}

.left-side {
    flex-grow: 0;
}

.left-side-content {
    padding: 10px;
    background: #fff;
}

.search {
    margin-top: 10px;
    width: 100%;
}

.loading {
    text-align: center;
    margin: 30px 0 30px;
}

.empty {
    text-align: center;
    padding-block: 10px;
    background-color: #fff;
}

.buttons {
    display: flex;
    gap: 10px;
}

@media screen and (max-width: @lg) {
    .filter {
        flex-direction: column;
        gap: 30px;
    }

    .left-side-content > div {
        display: flex;
        gap: 30px;
    }

    .search {
        width: fit-content;
    }
}
</style>
