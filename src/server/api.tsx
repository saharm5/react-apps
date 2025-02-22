const BASE_URL = "http://127.0.0.1:8000/";

/**
 * درخواست GET برای دریافت محصولات
 */
export const fetchProducts = async (url: string) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // در صورت نیاز می‌توانید هدر Authorization را اضافه کنید
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`خطا در دریافت اطلاعات: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
        throw error;
    }
};


export const submitForm = async (
    url: string,
    formData: object,
    withAuth: boolean = true
) => {
    const token = localStorage.getItem("token") || "";
    // اگر withAuth true باشد و توکن موجود باشد، هدر Authorization اضافه می‌شود.
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

        // در صورتی که پاسخ تنها 'ok' باشد
        if (text.trim() === "ok") {
            window.location.href = "/";
            return { text };
        }

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            throw new Error("Response is not valid JSON");
        }

        if (result.isregister === 1) {
            window.location.href = "/Signin";
            return;
        } else if (result.isregister === 2) {
            window.location.href = "/login";
            return;
        }

        return result;
    } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
    }
};
