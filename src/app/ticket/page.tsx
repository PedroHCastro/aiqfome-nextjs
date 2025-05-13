import { TicketItem } from "@/components/ticket";

import { RestaurantId } from "@/components/shared";
import { formatPrice } from "@/utils";

import ticketData from "@/data/ticket.json";

import styles from "./ticket.module.css";

export default function Ticket() {
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
        {ticketData.map((item, i) => (
          <TicketItem key={i} {...item} />
        ))}
      </div>

      <div className={styles.subtotalContainer}>
        <div className={styles.subtotalWrapper}>
          <span className={styles.subtotalLabel}>subtotal</span>
          <span className={styles.subtotalValue}>{formatPrice(112)}</span>
        </div>
        <button className={styles.goToPaymentButton}>ir para pagamento</button>
      </div>
    </div>
  );
}
