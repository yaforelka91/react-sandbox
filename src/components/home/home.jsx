import React from 'react';
import { Link } from '@reach/router';
import Carousel from '../carousel/carousel';
import cat_1 from '../../images/carousel/cat_1.jpg';
import cat_2 from '../../images/carousel/cat_2.jpg';
import cat_3 from '../../images/carousel/cat_3.jpg';
import cat_4 from '../../images/carousel/cat_4.jpg';

const Home = () => {
  return (
    <div className="container">
      <h1>Сборник всякого разного</h1>
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

      <h2>Снимите стресс и посмотрите котиков</h2>
      <Carousel>
        <div className="carousel__item">
          <img src={cat_1} alt="Кошка зевает" />
        </div>
        <div className="carousel__item">
          <img src={cat_2} alt="Котёнок на дереве" />
        </div>
        <div className="carousel__item">
          <img src={cat_3} alt="Рыжий кот" />
        </div>
        <div className="carousel__item">
          <img src={cat_4} alt="Серые котята" />
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
