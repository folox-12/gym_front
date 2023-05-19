import { defineStore } from 'pinia';
import { FiltersTypes } from '~/types/Filters';
import { DEFAULT_PAGE_SIZE } from '~/constants/general';

interface State {
    filters: FiltersTypes,
}

const DEFAULT_FILTERS: FiltersTypes = {
    search: '',
    pagging: 1,
    paggingSize: DEFAULT_PAGE_SIZE,
};

export const useFiltersStore = defineStore('filters', {
    state: (): State => ({
        filters: {
            ...DEFAULT_FILTERS,
        },
    }),

    actions: {
        updatePagging(pagging:number) {
            this.filters.pagging = pagging;
        },

        updateSearch(search:string) {
            this.filters.search = search;
        },

        updatePaggingSize(pageSize:number) {
            this.filters.paggingSize = pageSize;
        },

        resetFilters() {
            this.filters = {
                ...DEFAULT_FILTERS,
            };
        },
    },
});
