Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            require: true
        }
    },
    template: `
    <div class="product">

        <div class="product-image">
            <a :href="link">
                <img v-bind:src="image" alt="Socks">
            </a>
        </div>

        <div class="product-info">

            <h1>{{ title }}</h1>
            <span v-show="onSale">On Sale!</span>
            <p v-if="inStock > 0">In Stock</p>
            <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost Out of Stock!</p> -->
            <p v-else :class="{ lineThrough: !inStock }">Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>

            <p>{{ description }}</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor}"
                    v-on:mouseover="updateProduct(index)">
            </div>

            <div v-for="size in sizes" :key="size.sizeId">
                <p>{{ size.size }}</p>
            </div>

            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to Cart</button>
            <button v-on:click="removeFromCart">Remove from Cart</button>

            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>    

        </div>
        
    </div>
    `,
    data() {
        return {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        description: 'Cloth worn on feet.',
        link: 'https://vuejs.org/v2/guide/',
        // inStock: true,
        // inventory: 100,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "Green",
                variantImage: "assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "Blue",
                variantImage: "assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
        ],
        sizes: [
            {
                sizeId: 0,
                size: "Small"
            },
            {
                sizeId: 1,
                size: "Medium"
            },
            {
                sizeId: 2,
                size: "Large"
            }
        ],
        cart: 0}
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            this.cart -= 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            }
            return 2.99;
        }
    }   
});

let app = new Vue({
    el: '#app',
    data: {
        premium: false
    }
});