"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { QuantitySelector, OptionGroup } from "@/components/product";
import { QuantityItem } from "@/components/shared";
import { formatPrice } from "@/utils";
import { useTicket } from "@/hooks/useTicket";

import styles from "./product.module.css";

const dataLayoutConfig = [
  {
    title: "qual o tamanho?",
    description: "escolha 1",
    type: "radio",
    required: true,
    items: [
      {
        label: "Medium",
        price: 22.9,
        promotionalPrice: 19.9,
      },
      { label: "Large", price: 28.9 },
    ],
  },
  {
    title: "acompanhamentos",
    description: "escolha de 1 a 2",
    min: 1,
    max: 2,
    type: "checkbox",
    required: true,
    items: [
      { label: "Shoyu" },
      { label: "Ginger" },
      { label: "Wasabi" },
      { label: "No sides" },
    ],
  },
  {
    title: "vai querer bebida?",
    description: "escolha quantos quiser",
    type: "quantity",
    items: [
      { label: "Coca-Cola", price: 5, extra: true },
      { label: "Fanta Orange", price: 5, extra: true },
      { label: "Guaraná Antarctica", price: 5, extra: true },
      { label: "Prats Orange Juice", price: 6, extra: true },
      { label: "Still Water", price: 3, extra: true },
    ],
  },
  {
    title: "precisa de talher?",
    description: "escolha até 1",
    type: "radio",
    max: 1,
    items: [
      { label: "Chopsticks" },
      { label: "Disposable fork and knife", price: 1, extra: true },
    ],
  },
  {
    title: "mais alguma coisa?",
    description: "escolha até 2",
    type: "checkbox",
    max: 2,
    items: [
      { label: "Fortune cookie", price: 2, extra: true },
      { label: "Spring roll", price: 8, extra: true },
      { label: "Gyoza", price: 6, extra: true },
    ],
  },
];

export default function ProductPage() {
  const [layoutConfig, setlayoutConfig] = useState();
  const [currentItem, setCurrentItem] = useState({
    id: 1,
    name: "Ceviche de salmão",
    price: 19.9,
    quantity: 0,
    items: [],
  });
  const [startingAtValue] = useState(currentItem.price);
  const { addToTicket } = useTicket();
  const router = useRouter();

  const handleAddQuantity = () => {
    setCurrentItem((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };
  const handleremoveQuantity = () => {
    setCurrentItem((prev) => ({
      ...prev,
      quantity: prev.quantity - 1,
    }));
  };

  const handleAddItem = (option: any, configTitle: string, quantity = 1) => {
    const isExtra = option.extra && option.prince;

    const alreadyExists = currentItem.items.find(
      (item) => item.label === option.label && item.configTitle === configTitle
    );

    let updatedItems;

    if (alreadyExists) {
      updatedItems = currentItem.items.map((item) => {
        if (item.label === option.label && item.configTitle === configTitle) {
          return { ...item, quantity };
        }
        return item;
      });
    } else {
      const newItem = {
        ...option,
        configTitle,
        quantity,
      };
      updatedItems = [...currentItem.items, newItem];
    }

    const baseItem = !isExtra
      ? updatedItems.find(
          (item) => item.configTitle === configTitle && !item.extra
        )
      : null;

    const basePrice = baseItem
      ? baseItem.price || startingAtValue
      : startingAtValue;

    const sumExtras = updatedItems
      .filter((item) => item.extra)
      .reduce((acc, item) => {
        const itemPrice = item.promotionalPrice ?? item.price ?? 0;
        const itemQuantity = item.quantity ?? 1;

        return acc + itemPrice * itemQuantity;
      }, 0);

    console.log({ isExtra, basePrice, sumExtras });

    const totalPrice = basePrice + sumExtras;

    setCurrentItem({
      ...currentItem,
      price: totalPrice,
      items: updatedItems,
    });
  };

  const handleRemoveItem = (option: any, configTitle: string, quantity = 0) => {
    setCurrentItem((prev) => {
      const isExtra = option.extra;

      let updatedItems;

      if (quantity === 0) {
        updatedItems = prev.items.filter(
          (item) =>
            !(item.label === option.label && item.configTitle === configTitle)
        );
      } else {
        updatedItems = prev.items.map((item) => {
          if (item.label === option.label && item.configTitle === configTitle) {
            return { ...item, quantity };
          }
          return item;
        });
      }

      const baseItem = updatedItems.find(
        (item) => item.configTitle === configTitle && !item.extra
      );

      const basePrice = baseItem
        ? baseItem.price || startingAtValue
        : startingAtValue;

      const sumExtras = updatedItems
        .filter((item) => item.extra)
        .reduce((acc, item) => {
          const itemPrice = item.promotionalPrice ?? item.price ?? 0;
          const itemQuantity = item.quantity ?? 1;

          return acc + itemPrice * itemQuantity;
        }, 0);

      return {
        ...prev,
        price: basePrice + sumExtras,
        items: updatedItems,
      };
    });
  };

  const handleAddToTicket = () => {
    addToTicket(currentItem);
    router.push("/ticket");
  };

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
          <span className={styles.startingAtValue}>
            {formatPrice(startingAtValue)}
          </span>
        </div>
        <span className={styles.description}>
          salmão temperado com limão, cebola e pimenta
        </span>

        <div className={styles.totalValueWrapper}>
          <div className={styles.totalValueContent}>
            <span className={styles.quantityLabel}>quantos?</span>
            <span className={styles.totalLabel}>
              total{" "}
              <span className={styles.totalValue}>
                {formatPrice(currentItem.price * currentItem.quantity)}
              </span>
            </span>
          </div>

          {currentItem && currentItem.quantity > 0 ? (
            <QuantityItem
              handleRemoveItem={handleremoveQuantity}
              handleAddItem={handleAddQuantity}
              quantity={currentItem.quantity}
            />
          ) : (
            <button className={styles.addItemButon} onClick={handleAddQuantity}>
              adicionar
            </button>
          )}
        </div>
      </div>

      {dataLayoutConfig.map((layoutConfigItem) => {
        if (layoutConfigItem.type === "quantity") {
          return (
            <div key={layoutConfigItem.title} className={styles.contentWrapper}>
              <QuantitySelector
                title={layoutConfigItem.title}
                description={layoutConfigItem.description}
                options={layoutConfigItem.items}
                handleRemoveItem={handleRemoveItem}
                handleAddItem={handleAddItem}
              />
            </div>
          );
        }

        return (
          <div key={layoutConfigItem.title} className={styles.contentWrapper}>
            <OptionGroup
              title={layoutConfigItem.title}
              description={layoutConfigItem.description}
              type={layoutConfigItem.type}
              required={layoutConfigItem.required}
              options={layoutConfigItem.items}
              handleRemoveItem={handleRemoveItem}
              handleAddItem={handleAddItem}
              max={layoutConfigItem.max}
              min={layoutConfigItem.min}
            />
          </div>
        );
      })}

      <div className={styles.contentWrapper}>
        <textarea
          className={styles.observationArea}
          placeholder="alguma observação do item? • opcional ex: tirar algum ingrediente, ponto do prato"
        />
      </div>

      {currentItem.quantity > 0 && (
        <div className={styles.buttonTickerWrapper}>
          <button
            className={styles.seeTicketButton}
            onClick={handleAddToTicket}
          >
            PÕE NO TICKET -{" "}
            {formatPrice(currentItem.price * currentItem.quantity)}
          </button>
        </div>
      )}
    </div>
  );
}
