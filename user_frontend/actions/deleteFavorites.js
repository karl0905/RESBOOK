import {
    get_cookie,
} from "@/actions/cookie";

import {
    decrypt
} from "@/actions/encryption";

export async function deleteFavorite(restaurantId) {
    const encrypted_tokens = await get_cookie("tokens");
    const decrypted_tokens = await decrypt(encrypted_tokens);

    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/users/favorites/",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${decrypted_tokens.tokens.access}`,
                },
                body: JSON.stringify({ restaurant_id: restaurantId }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete favorite");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting favorite:", error);
        throw error;
    }
}
