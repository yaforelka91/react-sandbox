import React from 'react';
import { Link } from '@reach/router';

const Home = () => {
  return (
    <div className="container">
      <p>
        Не знаю, как ты здесь оказался, гость, но я тебе рада. Это <s>тарелка спагетти</s> моя первая песочница, где я
        самостоятельно пробовала работать с Реактом и реализовывала всякие популярные задачки.
      </p>
      <ul>
        <li>
          <Link to="/auth">Авторизация с валидацией</Link>
        </li>
        <li>
          <Link to="/search">Поиск вкусных рецептов</Link>
        </li>
        <li>
          <Link to="/map">Карта с пинами, балунами и вот этим всем</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
