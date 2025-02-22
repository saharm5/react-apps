const BASE_URL = "http://127.0.0.1:8000/";

export const fetchProducts = async (url: string) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${yourToken}` 
            }
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

export const submitForm = async (url: string, formData: object) => {
    try {
        // const csrfToken = getCsrfToken();
        const response = await fetch(new URL(url, BASE_URL).toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "X-CSRFToken": csrfToken|| "", 
            },
            // credentials: "include",  
            body: JSON.stringify(formData),
        });

        const text = await response.text();
        console.log("Response:", text);

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        if (text.trim() === 'ok') {
            return { text };
        }

        const responseData = JSON.parse(text);
        if (responseData.isregister === 1) {

            window.location.href = "/Signin";
        } else if (responseData.isregister === 2) {

            window.location.href = "/login";
        }
        try {
            const result = JSON.parse(text);
            return result;
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            throw new Error("Response is not valid JSON");
        }

    } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
    }
};
