"use client";

import { useState } from "react";

import { DecrementIcon, IncrementIcon, TrashIcon } from "@/assets/icons";

import styles from "./quantity-item.module.css";

interface Props {
  handleRemoveItem(): void;
  handleAddItem(): void;
  quantity: number;
}

export function QuantityItem({
  handleRemoveItem,
  handleAddItem,
  quantity,
}: Props) {
  const [quantityLocal, setQuantity] = useState<number>(quantity);

  const deleteItem = () => {
    handleRemoveItem();
  };

  const updateQuantity = (delta: number) => {
    setQuantity((prev) => {
      const updated = Math.max(1, prev + delta);
      return updated;
    });

    if (delta > 0) {
      handleAddItem();
    } else {
      deleteItem();
    }
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
      <span className={styles.quantityValue}>{quantityLocal}</span>
      <button className={styles.countButton} onClick={() => updateQuantity(1)}>
        <IncrementIcon />
      </button>
    </div>
  );
}
