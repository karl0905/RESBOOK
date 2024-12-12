import { get_cookie } from "@/actions/cookie";
import { decrypt } from "@/actions/encryption";

export async function fetchRestaurant(id = null) {
  const encryptedTokens = await get_cookie("tokens");
  const { tokens } = await decrypt(encryptedTokens);
  const url = id
    ? `${process.env.NEXT_PUBLIC_API_URL}/restaurants/?id=${id}`
    : `${process.env.NEXT_PUBLIC_API_URL}/restaurants/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokens.access}`,
    },
  });

  if (!response.ok) throw new Error("Network response was not ok");

  return await response.json();
}
