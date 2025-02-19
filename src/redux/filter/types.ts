import { SortItem } from "../../components/Sort";

export interface FilterSliceState {
  categoryId: number;
  activePage: number;
  searchValue?: string;
  activeSortName: SortItem
}