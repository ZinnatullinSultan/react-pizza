import React, { useCallback } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router';

import { Sort, Categories, PizzaBlock, Skeleton } from '../components';
import { SortItem, sortNames } from '../components/Sort';
import { useSelector } from 'react-redux';
import {
  setActiveCategory,
  setActiveSortName,
  setActivePage,
  setFilters,
} from '../redux/filter/slice';
import { selectPizzas } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';

import { RootState, useAppDispatch } from '../redux/store';
const Pagination = React.lazy(
  () => import(/* webpackChunkName: 'Pagination'*/ '../components/Pagination')
);

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);

  const { items, status } = useSelector(selectPizzas);
  const { activeSortName, categoryId, activePage, searchValue } = useSelector(
    (state: RootState) => state.filter
  );

  const onChangePage = (index: number) => {
    dispatch(setActivePage(index));
  };
  const onChangeSort = useCallback((i: SortItem) => {
    dispatch(setActiveSortName(i));
  }, []);
  const onClickCategory = useCallback((index: number) => {
    dispatch(setActiveCategory(index));
  }, []);

  const getPizza = async () => {
    const categoryUrl = categoryId ? `category=${categoryId}` : '';
    const sortUrl = activeSortName.sortProperty.replace('-', '');
    const orderUrl = activeSortName.sortProperty.includes('-') ? 'desc' : 'asc';
    const searchUrl = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({ categoryUrl, sortUrl, orderUrl, searchUrl, activePage })
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortType: activeSortName.sortProperty,
        activePage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, activeSortName.sortProperty, activePage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const activeSortName = sortNames.find(
        (obj) => obj.sortProperty === params.sortType
      );

      dispatch(
        setFilters({
          categoryId: Number(params.categoryId),
          activeSortName: activeSortName as SortItem,
          activePage: Number(params.activePage),
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizza();
    }
    isSearch.current = false;
  }, [categoryId, activeSortName, searchValue, activePage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort
          selectedSortName={activeSortName}
          onChangeSortName={onChangeSort}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить пиццы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : status === 'loading' ? (
          [...new Array(6)].map((_, index) => <Skeleton key={index} />)
        ) : (
          items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />)
        )}
      </div>
      <Pagination activePage={activePage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
