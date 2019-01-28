import { handleResponse, formatResponse, baseUrl } from '../helpers/apiHelper'

export const productService = {
    getProducts,
    getProduct,
    add,
    update,
    deleteProduct
};

async function getProducts() {

    const requestOptions = {
        method: 'GET'
    };

    try {
        const response = await fetch(baseUrl + `/products`, requestOptions);
        const data = await handleResponse(response);
        return formatResponse(true, data);
    }
    catch(error) {
        return formatResponse(false, error);
    }
}

async function getProduct(productId) {

    const requestOptions = {
        method: 'GET'
    };

    try {
        const response = await fetch(baseUrl + `/products/${productId}`, requestOptions);
        const data = await handleResponse(response);
        return formatResponse(true, data);
    }
    catch(error) {
        return formatResponse(false, error);
    }
}

async function add(product) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    try {
        const response = await fetch(baseUrl + `/products`, requestOptions);
        const data = await handleResponse(response);
        return formatResponse(true, data);
    }
    catch(error) {
        return formatResponse(false, error);
    }
}

async function update(product) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    try {
        const response = await fetch(baseUrl + `/products/${product.Id}`, requestOptions);
        const data = await handleResponse(response);
        return formatResponse(true, data);
    }
    catch(error) {
        return formatResponse(false, error);
    }
}

async function deleteProduct(productId) {
    const requestOptions = {
        method: 'DELETE'
    };

    try {
        const response = await fetch(baseUrl + `/products/${productId}`, requestOptions);
        const data = await handleResponse(response);
        return formatResponse(true, data);
    }
    catch(error) {
        return formatResponse(false, error);
    }
}