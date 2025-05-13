export const formatPrice = (price: number) =>
  `R$ ${price.toFixed(2).replace(".", ",")}`;
