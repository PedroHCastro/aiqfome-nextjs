export interface ProductItem {
  name: string;
  slug: string;
  fullPrice: number;
  promotionalPrice?: number;
  description: string;
  icon?: "veg" | "hot";
  startingAt?: boolean;
}

export interface ProductsModel {
  id: number;
  category: string;
  description: string;
  hasPromotionalPrice?: boolean;
  items: ProductItem[];
}
