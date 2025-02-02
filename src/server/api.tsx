// برای درخواست GET
export const fetchProducts = async (url: string) => {
    try {
        const response = await fetch("http://192.168.110.104:5000"+ url);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; 
    }
};


// برای درخواست POST
export const submitForm = async (url: string, formData: object) => {
    try {
        const response = await fetch("http://192.168.110.104:5000"+ url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
 