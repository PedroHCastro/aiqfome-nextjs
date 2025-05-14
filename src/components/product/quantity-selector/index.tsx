"use client";

import { useState } from "react";

import { DecrementIcon, IncrementIcon } from "@/assets/icons";

import styles from "./quantity-selector.module.css";

type Item = {
  label: string;
  price?: number;
};

type QuantitySelectorProps = {
  title: string;
  description?: string;
  options?: Item[];
  handleAddItem?: (item: Item, configTitle: string, quantity: number) => void;
  handleRemoveItem?: (
    item: Item,
    configTitle: string,
    quantity: number
  ) => void;
};

export function QuantitySelector({
  title,
  description,
  options,
  handleAddItem,
  handleRemoveItem,
}: QuantitySelectorProps) {
  const [quantities, setQuantities] = useState<number[]>(() =>
    options ? options.map(() => 0) : [0]
  );

  const updateQuantity = (index: number, delta: number) => {

    const oldQuantity = quantities[index];
    const newQuantity = Math.max(0, oldQuantity + delta);

    const quantitiesTemp = JSON.parse(JSON.stringify(quantities));
    quantitiesTemp[index] = newQuantity;

    if (options && options[index]) {
      const item = options[index];

      if (delta > 0 && newQuantity > oldQuantity) {
        handleAddItem?.(item, title, newQuantity);
      } else if (delta < 0 && newQuantity < oldQuantity) {
        handleRemoveItem?.(item, title, newQuantity);
      }
    }

    setQuantities(quantitiesTemp);
  };

  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <h4 className={styles.description}>{description}</h4>
      <div>
        {options && options.length > 0 ? (
          options.map((item, index) => (
            <div key={index} className={styles.itemWrapper}>
              <div className={styles.countWrapper}>
                <button
                  className={`${styles.countButton} ${styles.decrementButton}`}
                  onClick={() => updateQuantity(index, -1)}
                  disabled={quantities[index] === 0}
                >
                  <DecrementIcon />
                </button>
                <span className={styles.quantityValue}>
                  {quantities[index]}
                </span>
                <button
                  className={`${styles.countButton} ${styles.incrementButton}`}
                  onClick={() => updateQuantity(index, 1)}
                >
                  <IncrementIcon />
                </button>
              </div>

              <p className={styles.itemLabel}>{item.label}</p>
              {item.price && (
                <p className={styles.priceLabel}>+R$ {item.price.toFixed(2)}</p>
              )}
            </div>
          ))
        ) : (
          <div className={styles.itemWrapper}>
            <p className={styles.itemLabel}>Padrão</p>
          </div>
        )}
      </div>
    </div>
  );
}
