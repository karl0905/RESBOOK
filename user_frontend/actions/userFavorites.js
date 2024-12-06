import { get_cookie } from "@/actions/cookie";
import { decrypt } from "@/actions/encryption";

export async function addFavorite(restaurantId) {
    const encrypted_tokens = await get_cookie("tokens");
    const decrypted_tokens = await decrypt(encrypted_tokens);

    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/users/favorites/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${decrypted_tokens.tokens.access}`,
                },
                body: JSON.stringify({ restaurant_id: restaurantId }),
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

export async function getUserFavorites() {
    const encrypted_tokens = await get_cookie("tokens");
    const decrypted_tokens = await decrypt(encrypted_tokens);

    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/users/favorites/",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${decrypted_tokens.tokens.access}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch user favorites");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user favorites:", error);
        throw error;
    }
}
