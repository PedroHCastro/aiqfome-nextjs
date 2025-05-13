"use client";

import { useState } from "react";

import styles from "./option-group.module.css";

type Option = {
  label: string;
  price?: number;
};

type OptionGroupProps = {
  title: string;
  description: string;
  options: Option[];
  type: "radio" | "checkbox";
  required?: boolean;
  min?: number;
  max?: number;
  onChange?: (selected: number[]) => void;
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
}: OptionGroupProps) {
  const [selected, setSelected] = useState<number[]>([]);

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

    setSelected(updated);
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
        {options.map((option, index) => (
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
              <span className={styles.priceLabel}>
                +R$ {option.price.toFixed(2)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
