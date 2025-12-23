
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000
});

export async function getStoreProducts() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error) {
        console.log('An error has obtaining data', error);
    }
}

export async function getStoreProductsByID(id) {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        return response.data;
    } catch (error) {
        console.log('An error has obtaining data', error);
    }
}

export async function getCartByID(id) {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/carts/${id}`);
        const { products } = data;

        const productsWithData = await Promise.all(
            products.map(async (prod) => {
                const data = await getStoreProductsByID(prod.productId);
                return {...data, quantity: prod.quantity};
            })
        )
        return productsWithData;
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
}