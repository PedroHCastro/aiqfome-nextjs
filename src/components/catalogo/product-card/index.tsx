"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DiscountIcon, HotIcon, VegIcon } from "@/assets/icons";
import { ProductItem } from "@/types/products";

import styles from "./product-card.module.css";

interface Props {
  data: ProductItem;
}

export function ProductCard({ data }: Props) {
  const formatPrice = (price: number) =>
    `R$ ${price.toFixed(2).replace(".", ",")}`;

  const pathname = usePathname();

  return (
    <Link href={`${pathname}/${data.slug}`}>
      <div key={data.slug} className={styles.contentItem}>
        <div className={styles.itemInfoWrapper}>
          <div className={styles.itemTitleWrapper}>
            <p className={styles.itemTitle}>{data.name}</p>
            {data.icon === "veg" && <VegIcon />}
            {data.icon === "hot" && <HotIcon />}
          </div>
          <p className={styles.itemDescription}>{data.description}</p>
        </div>

        <div className={styles.itemPriceWrapper}>
          {data.startingAt && (
            <span className={styles.startingAt}>a partir de</span>
          )}
          {data.promotionalPrice ? (
            <>
              <span className={styles.oldPriceValue}>
                {formatPrice(data.fullPrice)}
              </span>

              <div className={styles.promoPriceWrapper}>
                <DiscountIcon width={12} height={12} />
                <span className={styles.promoPriceValue}>
                  {formatPrice(data.promotionalPrice)}
                </span>
              </div>
            </>
          ) : (
            <span className={styles.priceValue}>
              {formatPrice(data.fullPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
