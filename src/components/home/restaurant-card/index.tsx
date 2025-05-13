import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/utils";
import { RestaurantItem } from "@/types";

import { DotDetail } from "@/components/shared";

import styles from "./restaurant-card.module.css";

interface Props {
  data: RestaurantItem;
  isOpen?: boolean;
}

export function RestaurantCard({ data, isOpen }: Props) {
  const isFreeDelivery = data.delivery === 0;

  const getDeliveryIcon = () =>
    isFreeDelivery ? "/delivery-icon.svg" : "/aiq-delivery-icon.svg";

  const getDeliveryText = () =>
    isFreeDelivery ? "grátis" : formatPrice(data.delivery);

  return (
    <Link href={`/catalogo/${data.slug}`}>
      <div className={`${styles.card} ${isOpen && styles.cardIsOpen}`}>
        <Image
          src={`/${data.logo}`}
          alt={`logo ${data.name}`}
          width={72}
          height={72}
        />
        <div className={styles.infoWrapper}>
          <h3 className={styles.title}>{data.name}</h3>
          <div className={styles.metadataWrapper}>
            <div className={styles.metadataItem}>
              <Image
                src={getDeliveryIcon()}
                alt="Ícone de entrega"
                width={18}
                height={18}
                aria-hidden="true"
              />
              <span
                className={
                  isFreeDelivery ? styles.deliveryFree : styles.delivery
                }
              >
                {getDeliveryText()}
              </span>
            </div>

            <DotDetail />

            <div className={styles.metadataItem}>
              <Image
                src="/rating-icon.svg"
                alt="icone de avaliação"
                width={18}
                height={18}
              />
              <span className={styles.rating}>{data.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
