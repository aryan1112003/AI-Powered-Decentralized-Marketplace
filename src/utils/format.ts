export const formatPrice = (price: number): string => {
  return price.toFixed(4);
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};