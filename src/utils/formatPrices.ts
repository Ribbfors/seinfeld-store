const formatPriceToSek = (price: number) => {
  const newPrice = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(price / 100);

  return newPrice;
};

export default formatPriceToSek;
