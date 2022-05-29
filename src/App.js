import { useEffect, useState } from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaItem from './components/PizzaItem';
import PizzaItemSkeleton from './components/PizzaItemSkeleton';

import './scss/app.scss';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isPizzasLoading, setIsPizzasLoading] = useState(true);

  useEffect(() => {
    fetch('https://62935339089f87a57abe3300.mockapi.io/pizzas')
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
        setIsPizzasLoading(false);
      });
  }, []);

  return (
    <div>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              {isPizzasLoading
                ? [...new Array(8)].map((item, index) => <PizzaItemSkeleton key={index + 1} />)
                : pizzas.map((item) => <PizzaItem key={item.id} {...item} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
