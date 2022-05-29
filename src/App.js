import { useEffect, useState } from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaItem from './components/PizzaItem';

import './scss/app.scss';

function App() {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch('https://62935339089f87a57abe3300.mockapi.io/pizzas')
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPizzas(data);
      });
  }, [])


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
              {pizzas.map((item) => (
                <PizzaItem key={item.id} {...item}></PizzaItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
