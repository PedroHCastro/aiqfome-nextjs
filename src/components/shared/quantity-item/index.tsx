"use client";

import { useState } from "react";

import { DecrementIcon, IncrementIcon, TrashIcon } from "@/assets/icons";

import styles from "./quantity-item.module.css";

export function QuantityItem() {
  const [quantity, setQuantity] = useState<number>(1);

  const deleteItem = () => {};

  const updateQuantity = (delta: number) => {
    setQuantity((prev) => {
      const updated = Math.max(1, prev + delta);
      return updated;
    });
  };

  return (
    <div className={styles.countWrapper}>
      {quantity === 1 ? (
        <button className={styles.deleteButton} onClick={deleteItem}>
          <TrashIcon />
        </button>
      ) : (
        <button
          className={styles.countButton}
          onClick={() => updateQuantity(-1)}
        >
          <DecrementIcon />
        </button>
      )}
      <span className={styles.quantityValue}>{quantity}</span>
      <button className={styles.countButton} onClick={() => updateQuantity(1)}>
        <IncrementIcon />
      </button>
    </div>
  );
}
