"use client"
const fetchRestaurant = async () => {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/restaurants/read"
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

export default fetchRestaurant;
