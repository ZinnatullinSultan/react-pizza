import { CartItemProps } from '../components/CartItem';
import {calculateTotalPrice }from './calcTotalPrice';

const getItemsFromLS = () => {
  const data = localStorage.getItem('cart');
  const items: CartItemProps[] = data ? JSON.parse(data) : [];
  const totalPrice = calculateTotalPrice(items);
  return {
    items,
    totalPrice,
  };
};
export default getItemsFromLS;
