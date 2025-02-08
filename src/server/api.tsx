


const BASE_URL = "http://127.0.0.1:8000/";

export const fetchProducts = async (url: string) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${yourToken}`  // در صورت نیاز به توکن
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // دریافت پیام خطای سرور
            throw new Error(`خطا در دریافت اطلاعات: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
        throw error;
    }
};




// برای درخواست POST
export const submitForm = async (url: string, formData: object) => {
const BASE_URL = "http://127.0.0.1:8000/";

    try {
        // const csrfToken = getCsrfToken();
        const response = await fetch(new URL(url, BASE_URL).toString(),{
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
            return { message: 'Form submitted successfully!' };
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
 