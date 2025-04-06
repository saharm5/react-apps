// C:\Users\Sanay\react - apps\src\server\api.tsx
// const BASE_URL = "http://192.168.111.164:8081/";
// const BASE_URL = "http://127.0.0.1:8000/";
const BASE_URL = "http://localhost:8081/";


export const fetchProducts = async (
    url: string,
    withAuth: boolean = true
): Promise<any[]> => {
    const token = localStorage.getItem("token") || "";
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorMessage = await response.text();

            if (response.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    return fetchProducts(url, withAuth);
                }
            }
            throw new Error(`خطا در دریافت اطلاعات: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
        throw error;
    }
};


const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        console.error("Refresh Token موجود نیست");
        return null;
    }

    try {
        const response = await fetch(`${BASE_URL}/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            console.error("توکن رفرش معتبر نیست یا مشکل دیگری پیش آمده");
            return null;
        }

        const data = await response.json();
        const newAccessToken = data.access;
        localStorage.setItem("token", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("خطا در رفرش توکن:", error);
        return null;
    }
};

export const submitForm = async (
    url: string,
    formData: object,
    withAuth: boolean = true
) => {
    const token = localStorage.getItem("token") || "";
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
        const response = await fetch(new URL(url, BASE_URL).toString(), {
            method: "POST",
            headers,
            body: JSON.stringify(formData),
        });

        const text = await response.text();
        console.log("Response:", text);

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        if (text.trim() === "ok") {
            window.location.href = "/";
            return { text };
        }

        let result;
        try {
            result = JSON.parse(text);
            console.log("Response:", result);
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            throw new Error("Response is not valid JSON");
        }

        // if (result.isregister === 1) {
        //     window.location.href = "/Signin";
        // } else if (result.isregister === 2) {
        //     window.location.href = "/login";
        //     return;
        // }
        // else if (result.Status === "ok") {
        //     window.location.href = "/";
        //     return;
        // }

        return result;
    } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
    }
};
