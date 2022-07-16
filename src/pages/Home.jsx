import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort';
import { SearchContext } from '../App';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaItem from '../components/PizzaItem';
import PizzaItemSkeleton from '../components/PizzaItemSkeleton';
import Pagination from '../components/Pagination';
import { useRef } from 'react';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

export default function Home() {
  const { searchValue } = useContext(SearchContext);

  const pizzas = useSelector((state) => state.pizzas.items);
  const status = useSelector((state) => state.pizzas.status);

  const categoryId = useSelector((state) => state.filters.categoryId);
  const sort = useSelector((state) => state.filters.sort);
  const { currentPage } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';

    dispatch(
      fetchPizzas({
        category,
        search,
        sortBy,
        order,
        currentPage,
      }),
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  const filterPizza = pizzas.map((item) => <PizzaItem key={item.id} {...item} />);

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index) => dispatch(setCategoryId(index))}
        />
        <Sort value={sort} onChangeSort={(index) => dispatch(setSortType(index))} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(8)].map((item, index) => <PizzaItemSkeleton key={index + 1} />)
          : filterPizza}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
