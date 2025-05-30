"use client";
import { QuantityItem } from "@/components/shared";
import { PencilIcon } from "@/assets/icons";

import { TicketItemModel } from "@/types";
import { formatPrice } from "@/utils";
import { useCurrentItemHandler } from "@/hooks";

import styles from "./ticket-item.module.css";

export function TicketItem({
  name,
  price,
  extras = [],
  note,
  quantity,
}: TicketItemModel) {
  const onEdit = () => {};

  const {
    currentItem,
    handleAddItem,
    handleRemoveItem,
    handleAddQuantity,
    handleRemoveQuantity,
  } = useCurrentItemHandler({ price: 0, items: extras }, price);

  return (
    <div className={styles.container}>
      <div className={styles.headerTicket}>
        <span className={styles.title}>{name}</span>
        <span className={styles.price}>{formatPrice(price)}</span>
      </div>

      <div className={styles.actionsWrapper}>
        <button className={styles.buttonEdit} onClick={onEdit}>
          <PencilIcon className={styles.iconEdit} />
          editar
        </button>
        <QuantityItem
          handleAddItem={handleAddQuantity}
          handleRemoveItem={handleRemoveQuantity}
          quantity={quantity}
        />
      </div>

      {!!extras.length && (
        <div className={styles.extras}>
          {extras.map((extra) => (
            <div key={`extra_${extra.id}`}>
              <span className={styles.extraTitle}>• {extra.title}</span>
              {extra.items.map((item, index) => (
                <div key={index} className={styles.extraWrapper}>
                  <span className={styles.extraLabel}>{item.option}</span>
                  {item.price && (
                    <span className={styles.extraPrice}>
                      +{formatPrice(item.price)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {note && (
        <span className={styles.noteLabel}>
          observação: <span className={styles.noteValue}>{note}</span>
        </span>
      )}
    </div>
  );
}
