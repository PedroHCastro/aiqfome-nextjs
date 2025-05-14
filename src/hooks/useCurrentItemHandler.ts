import { useState } from "react";

interface Option {
  label: string;
  configTitle: string;
  quantity?: number;
  extra?: boolean;
  price?: number;
  promotionalPrice?: number;
  [key: string]: any;
}

interface CurrentItem {
  price: number;
  items: Option[];
  [key: string]: any;
}

export function useCurrentItemHandler(
  initialItem: CurrentItem,
  startingAtValue: number
) {
  const [currentItem, setCurrentItem] = useState<CurrentItem>(initialItem);

  const handleAddItem = (option: Option, configTitle: string, quantity = 1) => {
    const isExtra = option.extra && option.price;

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

    const totalPrice = basePrice + sumExtras;

    setCurrentItem({
      ...currentItem,
      price: totalPrice,
      items: updatedItems,
    });
  };

  const handleRemoveItem = (
    option: Option,
    configTitle: string,
    quantity = 0
  ) => {
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

  const handleAddQuantity = () => {
    setCurrentItem((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };

  const handleRemoveQuantity = () => {
    setCurrentItem((prev) => ({
      ...prev,
      quantity: Math.max(prev.quantity - 1, 1),
    }));
  };

  return {
    currentItem,
    setCurrentItem,
    handleAddItem,
    handleRemoveItem,
    handleAddQuantity,
    handleRemoveQuantity,
  };
}
