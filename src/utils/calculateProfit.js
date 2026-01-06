export const calculateProfit = (order) => {
  if(order && order.orderItem?.buyPrice && order.orderItem?.sellPrice){
    return parseFloat(((order.orderItem?.sellPrice - order.orderItem?.buyPrice) * order.orderItem?.quantity).toFixed(10));
  }
  return "-";
}