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

        clearProducts(name) {
            this.items = this.items.filter((i) => i.name != name);
        },

        setItemCount(item, count) {
            this.clearProducts(item.name);
            this.addProducts(count, item);
        },

        removeItem(item) {
            this.items = this.items.filter((i) => i.name !== item);
        },
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: (state) => groupBy(state.items, (item) => item.name),
        groupCount: (state) => (name) => state.grouped[name].length,
        total: (state) =>
            /*
        Aquí, accumulator és la variable que acumula el total mentre es recorre l'array de productes (state.items). El 0 passat com a segon argument a reduce és el valor inicial de accumulator. En aquest cas, comencem amb un total de 0 i afegim el preu de cada producte a mesura que iterem. Finalment, es retorna el total calculat.
        */
            state.items.reduce(
                (accumulator, item) => accumulator + item.price,
                0
            ),
    },
});
