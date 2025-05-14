export const formatPrice = (price: number) => {
  if (typeof price === "number")
    return `R$ ${price.toFixed(2).replace(".", ",")}`;

  return `R$ ${price}`;
};
