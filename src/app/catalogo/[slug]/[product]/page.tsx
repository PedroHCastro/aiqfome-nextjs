import Image from "next/image";

import { QuantitySelector, OptionGroup } from "@/components/product";
import { QuantityItem } from "@/components/shared";
import { formatPrice } from "@/utils";

import styles from "./product.module.css";

export default function ProductPage() {
  return (
    <div className={styles.container}>
      <Image
        src="/singleBanner.png"
        alt="banner da pagina"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
          marginBottom: -4,
        }}
      />
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Ceviche de salmão</h1>
        <div className={styles.startingAtWrapper}>
          <span className={styles.startingAt}>a partir de</span>
          <span className={styles.startingAtValue}>{formatPrice(19.9)}</span>
        </div>
        <span className={styles.description}>
          salmão temperado com limão, cebola e pimenta
        </span>

        <div className={styles.totalValueWrapper}>
          <div className={styles.totalValueContent}>
            <span className={styles.quantityLabel}>quantos?</span>
            <span className={styles.totalLabel}>
              total{" "}
              <span className={styles.totalValue}>{formatPrice(29.9)}</span>
            </span>
          </div>

          <QuantityItem />
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <OptionGroup
          title="qual o tamanho?"
          description="escolha 1"
          type="radio"
          required
          options={[
            {
              label: "Medium",
              description: "From R$ 22.90 to R$ 19.90",
              highlight: true,
            },
            { label: "Large", description: "R$ 28.90" },
          ]}
        />
      </div>

      <div className={styles.contentWrapper}>
        <OptionGroup
          title="acompanhamentos"
          description="escolha de 1 a 2"
          type="checkbox"
          required
          min={1}
          max={2}
          options={[
            { label: "Shoyu" },
            { label: "Ginger" },
            { label: "Wasabi" },
            { label: "No sides" },
          ]}
        />
      </div>
      <div className={styles.contentWrapper}>
        <QuantitySelector
          title="vai querer bebida?"
          description="escolha quantos quiser"
          items={[
            { label: "Coca-Cola", price: 5 },
            { label: "Fanta Orange", price: 5 },
            { label: "Guaraná Antarctica", price: 5 },
            { label: "Prats Orange Juice", price: 6 },
            { label: "Still Water", price: 3 },
          ]}
        />
      </div>
      <div className={styles.contentWrapper}>
        <OptionGroup
          title="precisa de talher?"
          description="escolha até 1"
          type="radio"
          max={1}
          options={[
            { label: "Chopsticks" },
            { label: "Disposable fork and knife", price: 1 },
          ]}
        />
      </div>
      <div className={styles.contentWrapper}>
        <OptionGroup
          title="mais alguma coisa?"
          description="escolha até 2"
          type="checkbox"
          max={2}
          options={[
            { label: "Fortune cookie", price: 2 },
            { label: "Spring roll", price: 8 },
            { label: "Gyoza", price: 6 },
          ]}
        />
      </div>
      <div className={styles.contentWrapper}>
        <textarea
          className={styles.observationArea}
          placeholder="alguma observação do item? • opcional ex: tirar algum ingrediente, ponto do prato"
        />
      </div>
    </div>
  );
}
