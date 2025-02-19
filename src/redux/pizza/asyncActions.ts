import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaBlockProps } from '../../components/PizzaBlock';
import { FetchPizzasArgs } from './types';

export const fetchPizzas = createAsyncThunk<PizzaBlockProps[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { categoryUrl, sortUrl, orderUrl, searchUrl, activePage } = params;
    const { data } = await axios.get<PizzaBlockProps[]>(
      `https://6793995b5eae7e5c4d8f3eb3.mockapi.io/pizza?page=${activePage}&limit=4&${categoryUrl}&sortBy=${sortUrl}&order=${orderUrl}&${searchUrl}`
    );
    return data;
  }
);