import { fetchRestaurant } from "@/actions/restaurant";
import {
  Darkbackground,
  Logo,
} from "@/features/dashboard";
import {
  Button
} from "@/global/components";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineStar
} from "react-icons/ai";
import {
  fetchFavorites
} from "@/actions/favorites";

async function RestaurantPage({ params }) {
  const { id } = await params;
  const restaurants = await fetchRestaurant(id);
  const restaurant = restaurants[0];

  const favorites = await fetchFavorites();

  const rating = restaurant?.rating || 0;

  return (
    <div className="h-screen">
      <Logo />
      <Darkbackground>
        <div className="px-2 flex flex-col gap-4">
          <div className="flex w-full justify-between text-sm items-center">
            <p>Kapacitet: {restaurant?.current_capacity}/{restaurant?.capacity}</p>
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                index < Math.floor(rating) ? (
                  <AiFillStar key={index} />
                ) : (
                  <AiOutlineStar key={index} />
                )
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-between items-center">
              <h2 className="font-semibold text-2xl">{restaurant?.name}</h2>
              <AiFillHeart className="text-red-500 text-2xl" />
            </div>
            <p className="text-xs">{restaurant?.address}</p>
          </div>
          <p className="text-xs">{restaurant?.description}</p>
          <div>
            <Button title="Reserver" />
          </div>
          <p className="text-xs">Phone: {restaurant?.phone}</p>
        </div>
      </Darkbackground>
    </div>
  );
}

export default RestaurantPage;
