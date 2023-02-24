import { defineStore } from 'pinia'

export const useTraningsStore = defineStore('tranings', {
    state: () => ({
        count: 0,
        name: 'Eduardo'
     }),

    actions: {
        increment() {
        this.count++
        },
    },
})
