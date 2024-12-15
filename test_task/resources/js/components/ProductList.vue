<template>
    <div>
        <table>
            <thead>
            <tr>
                <th>Наименование</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product.id">
                    <td>{{ product.name }}}</td>
                    <td>
                        <button @click = "deleteProduct(product.id)">Удалить</button>
                        <button @click = "moveUp(index)">Вверх</button>
                        <button @click = "moveDown(index)">Вниз</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {FetchProducts, deleteProduct, updateProductOrder} from '../api/api';

export default {
    data(){
        return {
            products: []
        };
    },
    async mounted() {
        await this.loadProducts();
    },
    methods: {
        async loadProducts() {
            try {
                this.products = await FetchProducts();
            } catch (error) {
                console.error(error.message);
            }
        },
        async deleteProduct(id) {
            try {
                await deleteProduct(id);
                this.products = this.products.filter((product) => product.id !== id);
            } catch (error) {
                console.error(error.message)
            }
        },
        async moveUp(index) {
            if (index > 0) {
                const temp = this.products[index];
                this.products[index] = this.products[index - 1];
                this.products[index - 1] = temp;

                await this.updateOrder();
            }
        },
        async moveDown(index) {
            if (index < this.products.length-1) {
                const temp = this.products[index];
                this.products[index] = this.products[index + 1];
                this.products[index + 1] = temp

                await this.updateOrder();
            }
        },
        async updateOrder() {
            const order = this.products.map((product) => product.id);
            try {
                await updateProductOrder(order);
            } catch (error) {
                console.error(error.message)
            }
        }
    }
}

</script>
