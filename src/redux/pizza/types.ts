import { PizzaBlockProps } from "../../components/PizzaBlock"

export enum Status{
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface PizzaSliceState{
  items: PizzaBlockProps[],
  status: Status,
}
export type FetchPizzasArgs={
  categoryUrl: string,
  sortUrl: string,
  orderUrl: string,
  searchUrl: string,
  activePage: number
}