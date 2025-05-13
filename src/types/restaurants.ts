export interface RestaurantItem {
  id: number;
  name: string;
  slug: string;
  delivery: number;
  rating: number;
  logo: string;
}

export interface RestaurantModel {
  open: RestaurantItem[];
  closed: RestaurantItem[];
}
