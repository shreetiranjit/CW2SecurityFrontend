export const priceConverter = number => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 2
  });

  return formatter.format(number);
};
