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

        </div>

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.rating }}</p>
                <p>{{ review.name }}</p>
                <p>{{ review.review }}</p>
                <p>Would recommend: {{ review.recommend }}</p>
                </li>
            </ul>
        </div>

        <product-review @review-submitted="addReview"></product-review>
        
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
        reviews: [

        ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview);
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

Vue.component('product-review', {
    template:`
        <form class="review-form" @submit.prevent="onSubmit">

            <p v-if="errors.length">
                <strong>Please correct the following error(s):</strong>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <label for="recommend">Would you recommend this product?</label>

                <div>
                    <input type="radio" id="yes" name="recommend" value="Yes" v-model="recommend">
                    <label for="yes">Yes</label>
                </div>

                <div>
                    <input type="radio" id="no" name="recommend" value="No" v-model="recommend">
                    <label for="no">No</label>
                </div>
            </p>

            <p>
                <input type="submit" value="Submit">
            </p>

        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview);
                this.name = null,
                this.review = null,
                this.rating = null,
                this.recommend = null
            }
            else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }
        }
    }
});

let app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        addToCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            this.cart.pop(id);
        }
    }
});