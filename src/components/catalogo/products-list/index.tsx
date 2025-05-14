"use client";

import { useState } from "react";
import styles from "./products-list.module.css";
import { ProductsModel } from "@/types/products";
import { ChevronDownIcon, DiscountIcon } from "@/assets/icons";
import { ProductCard } from "../product-card";

interface Props {
  items: ProductsModel[];
}

export function ProductsList({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      {items.map((category, index) => (
        <div key={category.id} className={styles.item}>
          <button className={styles.header} onClick={() => toggleItem(index)}>
            <div className={styles.contentHeaderWrapper}>
              <div className={styles.titleHeaderWrapper}>
                <p className={styles.titleHeader}>{category.category}</p>
                {category.hasPromotionalPrice && (
                  <DiscountIcon width={18} height={18} />
                )}
              </div>

              {category.description && (
                <p className={styles.descriptionHeader}>
                  {category.description}
                </p>
              )}
            </div>

            <ChevronDownIcon
              className={`${styles.icon} ${
                openIndex === index ? styles.open : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className={styles.contentWrapper}>
              {category.items.map((item) => (
                <ProductCard key={item.slug} data={item} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
