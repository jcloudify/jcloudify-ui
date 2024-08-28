export const printMoney = (amount: number) => {
  const finalAmount = amount / 100;
  return `$ ${finalAmount.toFixed(2)}`;
};
