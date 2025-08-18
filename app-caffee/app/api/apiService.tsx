
import axios from "axios";

// Đặt URL gốc của API
const API_URL = "http://10.18.6.196:8080/api";

// Lấy token JWT từ localStorage
const getToken = () => localStorage.getItem("jwt-token");

// Tạo một instance của Axios với cấu hình sẵn
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Để đính kèm cookie nếu cần thiết
});

// Thêm interceptor để thêm token vào mỗi yêu cầu nếu có
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Xử lý các lỗi của yêu cầu
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Kiểm tra lỗi xác thực
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Xóa token nếu không hợp lệ
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("username");
        }
        return Promise.reject(error);
    }
);

// Hàm gọi API chung
function callApi(endpoint: string, method = "GET", data = null) {
    return axiosInstance({
        method,
        url: `${API_URL}/${endpoint}`,
        data,
    }).catch((error) => {
        console.error("API request failed:", error);
        throw error;
    });
}

// Các hàm API cụ thể
export function GET_ALL(endpoint: string) {
    return callApi(`public/${endpoint}`, "GET");
}

export function GET_ALL_CATEGORIES() {
    const url = `public/categories`;


}


export function GET_ID(endpoint: any, id: any) {
    return callApi(`public/${endpoint}/${id}`, "GET");
}

export function GET_IMG(imgName: string) {
    return `${API_URL}/public/products/image/${imgName}`;
}

export function GET_IMG_categories(imgName: any) {
    return `${API_URL}/public/categories/image/${imgName}`;
}

export function POST_ADD(endpoint: any, data: null | undefined) {
    return callApi(`admin/${endpoint}`, "POST", data);
}

export function POST_W(userId: any, productId: any) {
    return callApi(`public/wishlists/${userId}/add/${productId}`, "POST");
}

export function DELETE_W(userId: any, productId: any) {
    return callApi(`public/wishlists/${userId}/dell/${productId}`, "DELETE");
}

export function POST_C(userId: any, productId: any) {
    return callApi(`public/carts/${userId}/products/${productId}/quantity/1`, "POST");
}

export function DELETE_C(userId: any, productId: any) {
    return callApi(`public/cart/${userId}/dell/${productId}`, "DELETE");
}

// Hàm GET_PRODUCTS_BY_CATEGORY để lấy sản phẩm theo categoryId
export function GET_PRODUCTS_BY_CATEGORY(categoryId: any) {
    if (!categoryId) {
        console.error("categoryId is undefined");
        return Promise.reject(new Error("categoryId is undefined"));
    }
    return callApi(`public/categories/${categoryId}/products`, "GET");
}