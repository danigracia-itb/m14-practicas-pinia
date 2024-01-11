import { groupBy } from "lodash";
import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
        };
    },
    actions: {
        addProducts(count, product) {
            count = parseInt(count);
            for (let i = 0; i < count; i++) {
                this.items.push({ ...product });
            }
        },
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: (state) => groupBy(state.items, (item) => item.name),
    },
});
