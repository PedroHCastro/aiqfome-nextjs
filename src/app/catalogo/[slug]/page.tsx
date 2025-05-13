import { notFound } from "next/navigation";

import { ProductsList } from "@/components/catalogo";
import { DotDetail, RestaurantId } from "@/components/shared";

import { ProductsModel } from "@/types/products";

import {
  ChevronRightIcon,
  DeliveryIcon,
  HeartIcon,
  RatingIcon,
  ShareIcon,
} from "@/assets/icons";

import restaurants from "@/data/restaurants.json";
import products from "@/data/products.json";

import { formatPrice } from "@/utils";

import styles from "./catalogo.module.css";

interface Params {
  params: { slug: string };
}

export default function CatalogPage({ params }: Params) {
  const { slug } = params;

  const item = restaurants.open.find((restaurant) => restaurant.slug === slug);

  if (!item) return notFound();

  return (
    <div className={styles.container}>
      <div className={styles.metadataWrapper}>
        <RestaurantId logo={item.logo} name={item.name} />
        <div className={styles.flexWrapper}>
          <button className={styles.actionButton}>
            <ShareIcon />
          </button>
          <button className={styles.actionButton}>
            <HeartIcon />
          </button>

          <span className={styles.moreInfos}>
            mais infos <ChevronRightIcon />
          </span>
        </div>
        <div className={styles.flexWrapper}>
          <DeliveryIcon
            width={18}
            height={16}
            className={styles.deliveryIcon}
          />
          <div className={styles.deliveryPriceWrapper}>
            <span className={styles.deliveryPriceLabel}>
              {formatPrice(4.99)}
            </span>
            <ChevronRightIcon />
          </div>
          <DotDetail />
          <span className={styles.commonLabel}>hoje, 30-40 min</span>
          <DotDetail />
          <span className={styles.commonLabel}>5.2km</span>
        </div>
        <span className={styles.freeDeliveryOrdersOver}>
          entrega grátis acima de {formatPrice(35)}
        </span>
        <div className={styles.flexWrapper}>
          <RatingIcon width={16} height={16} />
          <div className={styles.ratingWrapper}>
            <span className={`${styles.commonLabel} ${styles.ratingLabel}`}>
              4.5 de 5
            </span>
            <ChevronRightIcon />
          </div>
          <DotDetail />
          <span className={styles.closedTime}>fecha às 20:00</span>
        </div>
        <span className={styles.commonLabel}>
          pedido mínimo: {formatPrice(15)}
        </span>
      </div>

      <ProductsList items={products as ProductsModel[]} />
    </div>
  );
}
