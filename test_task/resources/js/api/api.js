const API_BASE_URL = '/api';

export const FetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error("Ошибка при загрузке продуктов");
    }
    return await response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Ошибка при удалении продукта');
    }
    return await response.json();
};

export const updateProductOrder = async (order) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/order`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order }),
        });
        if (!response.ok) {
            throw new Error('Ошибка при удалении продукта');
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating product order:", error.message);
        throw error;
    }
}
