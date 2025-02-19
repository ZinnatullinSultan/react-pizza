import { CartItemProps } from "../components/CartItem";

export function calculateTotalPrice(items: CartItemProps[]) {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}