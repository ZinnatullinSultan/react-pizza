import { CartItemProps } from "../../components/CartItem";

export interface CartSliceState {
  totalPrice: number;
  items: CartItemProps[];
}