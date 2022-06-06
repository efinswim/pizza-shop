import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaItem from '../components/PizzaItem';
import PizzaItemSkeleton from '../components/PizzaItemSkeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isPizzasLoading, setIsPizzasLoading] = useState(true);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);

  const categoryId = useSelector((state) => state.filters.categoryId);
  console.log('categoryId', categoryId);
  const dispatch = useDispatch()

  useEffect(() => {
    setIsPizzasLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    fetch(
      `https://62935339089f87a57abe3300.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
        setIsPizzasLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const filterPizza = pizzas.map((item) => (
    <PizzaItem key={item.id} {...item} />
  ));

  const filterPizzaLocal = (array) => {
    array.filter((pizza) => {
      if (pizza.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    });
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onChangeCategory={(index) => dispatch(setCategoryId(index))}
        />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isPizzasLoading
          ? [...new Array(8)].map((item, index) => (
              <PizzaItemSkeleton key={index + 1} />
            ))
          : filterPizza}
      </div>
      <Pagination onChangePage={(pageNumber) => setCurrentPage(pageNumber)} />
    </div>
  );
}
