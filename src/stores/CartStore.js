import { useLocalStorage } from "@vueuse/core";
import { groupBy } from "lodash";
import { defineStore } from "pinia";
import { useAuthUserStore } from "./AuthStore";

export const useCartStore = defineStore("CartStore", {
    historyEnabled: true,
    state: () => {
        return {
            items: useLocalStorage("CartStore:items", []),
        };
    },
    actions: {
        addProducts(count, product) {
            count = parseInt(count);
            for (let i = 0; i < count; i++) {
                this.items.push({ ...product });
            }
        },

        setItemCount(item, count) {
            const index = this.items.findIndex((i) => i.name === item.name);

            if (index !== -1) {
                // Si se encuentra el item en el array, actualiza su cantidad
                const newCount = parseInt(count);
                if (newCount > 0) {
                    // Actualiza la cantidad de veces que aparece el artículo en el array
                    const currentCount = this.items.filter(
                        (i) => i.name === item.name
                    ).length;
                    const diff = newCount - currentCount;

                    if (diff > 0) {
                        // Agrega el artículo al array más veces si la nueva cantidad es mayor
                        for (let i = 0; i < diff; i++) {
                            this.items.push({ ...item });
                        }
                    } else if (diff < 0) {
                        // Elimina el artículo del array si la nueva cantidad es menor
                        for (let i = 0; i < Math.abs(diff); i++) {
                            const itemIndex = this.items.findIndex(
                                (i) => i.name === item.name
                            );
                            this.items.splice(itemIndex, 1);
                        }
                    }
                } else {
                    // Si la nueva cantidad es 0 o negativa, elimina todos los elementos del array
                    this.items = this.items.filter((i) => i.name !== item.name);
                }
            }
        },

        removeItem(item) {
            this.items = this.items.filter((i) => i.name !== item);
        },

        checkout() {
            const authUserStore = useAuthUserStore();

            alert(
                `${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`
            );
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
