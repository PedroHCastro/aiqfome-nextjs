"use client";

import { useState } from "react";

import { DecrementIcon, IncrementIcon } from "@/assets/icons";

import styles from "./quantity-selector.module.css";

type Item = {
  label: string;
  price: number;
};

type QuantitySelectorProps = {
  title: string;
  description: string;
  items: Item[];
};

export function QuantitySelector({
  title,
  description,
  items,
}: QuantitySelectorProps) {
  const [quantities, setQuantities] = useState<number[]>(() =>
    items.map(() => 0)
  );

  const updateQuantity = (index: number, delta: number) => {
    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(0, updated[index] + delta);
      return updated;
    });
  };

  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <h4 className={styles.description}>{description}</h4>
      <div>
        {items.map((item, index) => (
          <div key={index} className={styles.itemWrapper}>
            <div className={styles.countWrapper}>
              <button
                className={`${styles.countButton} ${styles.decrementButton}`}
                onClick={() => updateQuantity(index, -1)}
                disabled={quantities[index] === 0}
              >
                <DecrementIcon />
              </button>
              <span className={styles.quantityValue}>{quantities[index]}</span>
              <button
                className={`${styles.countButton} ${styles.incrementButton}`}
                onClick={() => updateQuantity(index, 1)}
              >
                <IncrementIcon />
              </button>
            </div>

            <p className={styles.itemLabel}>{item.label}</p>
            <p className={styles.priceLabel}>+R$ {item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
