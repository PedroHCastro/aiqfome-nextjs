"use client";

import { useRef, useState } from "react";

import styles from "./option-group.module.css";
import { formatPrice } from "@/utils";

type Option = {
  label: string;
  price?: number;
  promotionalPrice?: number;
  extra?: boolean;
};

type OptionGroupProps = {
  title: string;
  description?: string;
  options?: Option[];
  type: "radio" | "checkbox";
  required?: boolean;
  min?: number;
  max?: number;
  onChange?: (selected: number[]) => void;
  handleAddItem?: (option: Option, configTitle: string) => void;
  handleRemoveItem?: (option: Option, configTitle: string) => void;
};

export function OptionGroup({
  title,
  description,
  options,
  type,
  required = false,
  min,
  max,
  onChange,
  handleRemoveItem,
  handleAddItem,
}: OptionGroupProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const prevSelectedRef = useRef<number[]>([]);

  const toggleOption = (index: number) => {
    let updated: number[] = [];

    if (type === "radio") {
      updated = [index];
    } else {
      if (selected.includes(index)) {
        updated = selected.filter((i) => i !== index);
      } else {
        if (!max || selected.length < max) {
          updated = [...selected, index];
        } else {
          return;
        }
      }
    }

    const removed = prevSelectedRef.current.filter((i) => !updated.includes(i));
    const added = updated.filter((i) => !prevSelectedRef.current.includes(i));

    removed.forEach((i) => {
      const option = options?.[i];
      if (option && handleRemoveItem) {
        handleRemoveItem(option, title);
      }
    });

    added.forEach((i) => {
      const option = options?.[i];
      if (option && handleAddItem) {
        handleAddItem(option, title);
      }
    });

    setSelected(updated);
    prevSelectedRef.current = updated;

    onChange?.(updated);
  };

  const isSelected = (index: number) => selected.includes(index);

  return (
    <div>
      <div className={styles.contentHeaderWrapper}>
        <div className={styles.infoWrapper}>
          <h3 className={styles.title}>{title}</h3>
          <h4 className={styles.description}>{description}</h4>
        </div>

        {required && <span className={styles.requiredTag}>obrigatório</span>}
      </div>

      <div>
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <div
              key={index}
              className={styles.item}
              onClick={() => toggleOption(index)}
            >
              <div
                className={`${styles.check} ${
                  type === "radio" ? styles.radio : styles.select
                } ${isSelected(index) && styles.selected}`}
              />

              <span className={styles.optionLabel}>{option.label}</span>
              {option.price !== undefined && (
                <>
                  <span
                    className={`${styles.oldPriceLabel} ${
                      !option.promotionalPrice && styles.hide
                    }`}
                  >
                    de {formatPrice(option.price)} por
                  </span>

                  <span
                    className={`${styles.priceLabel} ${
                      option.promotionalPrice && styles.promotion
                    }`}
                  >
                    {option.extra ? "+" : ""}
                    {formatPrice(
                      option.promotionalPrice
                        ? option.promotionalPrice
                        : option.price
                    )}
                  </span>
                </>
              )}
            </div>
          ))
        ) : (
          <div className={styles.item}>
            <div
              className={`${styles.check} ${
                type === "radio" ? styles.radio : styles.select
              } ${styles.selected}`}
            />

            <span className={styles.optionLabel}>Padrão</span>
          </div>
        )}
      </div>
    </div>
  );
}
