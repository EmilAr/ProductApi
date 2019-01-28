export const baseUrl = `http://localhost:5000/api`;

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = {
                message: response.statusText,
                code: response.code
            }
            return Promise.reject(error);
        }

        return data;
    });
}

export function formatResponse(success, data) {
    return {
        success,
        data
    }
}