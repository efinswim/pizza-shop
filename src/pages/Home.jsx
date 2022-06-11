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

import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaItem from '../components/PizzaItem';
import PizzaItemSkeleton from '../components/PizzaItemSkeleton';
import Pagination from '../components/Pagination';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isPizzasLoading, setIsPizzasLoading] = useState(true);

  const { searchValue } = useContext(SearchContext);

  const categoryId = useSelector((state) => state.filters.categoryId);
  const sort = useSelector((state) => state.filters.sort);
  console.log('sort', sort)
  const { currentPage } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsPizzasLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';

    axios
      .get(
        `https://62935339089f87a57abe3300.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsPizzasLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  const filterPizza = pizzas.map((item) => (
    <PizzaItem key={item.id} {...item} />
  ));

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onChangeCategory={(index) => dispatch(setCategoryId(index))}
        />
        <Sort
          value={sort}
          onChangeSort={(index) => dispatch(setSortType(index))}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isPizzasLoading
          ? [...new Array(8)].map((item, index) => (
              <PizzaItemSkeleton key={index + 1} />
            ))
          : filterPizza}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
