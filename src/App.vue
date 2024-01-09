<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";

import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore";
// import { storeToRefs } from "pinia";
// const products = storeToRefs(useProductStore());

const cartStore = useCartStore();

const productStore = useProductStore();
productStore.fill();

const addToCart = (count, product) => {
    count = parseInt(count);
    for (let i = 0; i < count; i++) {
        cartStore.items.push(product);
    }

    console.log(cartStore.items);
};
</script>

<template>
    <div class="container">
        <TheHeader />
        <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
            <ProductCard
                v-for="product in productStore.products"
                :key="product.name"
                :product="product"
                @addToCart="addToCart($event, product)"
            />
        </ul>
    </div>
</template>
