"use client";

import { TicketItem } from "@/components/ticket";

import { RestaurantId } from "@/components/shared";
import { formatPrice } from "@/utils";

import styles from "./ticket.module.css";
import { useTicket } from "@/hooks/useTicket";
import { useEffect, useState } from "react";
import { TicketItemModel } from "@/types";

export default function Ticket() {
  const { ticket } = useTicket();

  const [subtotal, setSubtotal] = useState(0);

  const calculateTotal = (items: TicketItemModel[]): number => {
    return items.reduce((total, item) => {
      const basePrice = item.price * item.quantity;

      const extrasTotal =
        item.extras?.reduce((extraSum, extraGroup) => {
          const groupSum = extraGroup.items.reduce((itemSum, extraItem) => {
            return itemSum + (extraItem.price || 0);
          }, 0);
          return extraSum + groupSum;
        }, 0) || 0;

      return total + basePrice + extrasTotal * item.quantity;
    }, 0);
  };

  useEffect(() => {
    setSubtotal(calculateTotal(ticket));
  }, [ticket]);

  return (
    <div className={styles.container}>
      <div className={styles.idWrapper}>
        <RestaurantId
          logo={"./matsuri.png"}
          extraInformation="seus itens em"
          name="Matsuri Concept"
        />
      </div>

      <div className={styles.itemWrapper}>
        {ticket.map((item, i) => (
          <TicketItem key={i} {...item} />
        ))}
      </div>

      <div className={styles.subtotalContainer}>
        <div className={styles.subtotalWrapper}>
          <span className={styles.subtotalLabel}>subtotal</span>
          <span className={styles.subtotalValue}>{formatPrice(subtotal)}</span>
        </div>
        <button className={styles.goToPaymentButton}>ir para pagamento</button>
      </div>
    </div>
  );
}
