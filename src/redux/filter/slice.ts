import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortItem } from '../../components/Sort';
import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
  categoryId: 0,
  activePage: 1,
  searchValue: '',
  activeSortName: {
    name: 'популярности ▲',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
    setActiveSortName(state, action: PayloadAction<SortItem>) {
      state.activeSortName = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.activePage = Number(action.payload.activePage);
      state.activeSortName = action.payload.activeSortName;
    },
  },
});

export const {
  setActiveCategory,
  setActiveSortName,
  setActivePage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
