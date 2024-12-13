import { fetchRestaurant } from "@/actions/restaurant";
import { fetchFavorites } from "@/actions/favorites";
import { RestaurantSite } from "@/features/restaurantInfo";

async function RestaurantPage({ params }) {
  const { id } = await params;
  const restaurant = await fetchRestaurant(id);

  const favorites = await fetchFavorites();

  const rating = restaurant?.rating || 0;

  return (
    <div className="h-screen">
      <RestaurantSite
        restaurant={restaurant}
        rating={rating}
        favorites={favorites}
      />
    </div>
  );
}

export default RestaurantPage;
