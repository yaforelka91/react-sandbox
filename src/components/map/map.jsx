import React, { useRef } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup, ZoomControl, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import './styles.scss';
import pin from '../../images/icons/pin.svg';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { useState } from 'react';
import { useEffect } from 'react';

const DEFAULT_LOCATION = [55.755814, 37.617635];
const DEFAULT_ZOOM = 13;
const VISITED_COUNTRIES = [
  {
    id: 1,
    year: [2008, 2010, 2011],
    country: 'Турция',
    coords: [39.056249, 35.302075],
    description: 'В Турции мы были несколько раз! Там классная средиземноморская природа и улыбчивые люди.',
  },
  {
    id: 2,
    year: 2012,
    country: 'Тунис',
    coords: [34.773985, 9.602442],
    description: 'О, мы наконец-то побывали в Африке :D И переночевали в Сахаре!',
  },
  {
    id: 3,
    year: 2013,
    country: 'Египет',
    coords: [26.112189, 29.90523],
    description:
      'Египет нам запомнится красотами Красного моря: там потрясающие кораллы и морской окунь, готовый откусить палец',
  },
  {
    id: 4,
    year: 2013,
    country: 'Израиль',
    coords: [30.982826, 34.84609],
    description:
      'Мертвое море - это какое-то чудо. А ещё в Эйлате мы впервые в жизни поплавали с аквалангом и дельфинами прямо в море!',
  },
  {
    id: 5,
    year: 2015,
    country: 'Шри Ланка',
    coords: [7.745521, 80.606846],
    description:
      'На следующий день после свадьбы мы собрали чемоданы и улетели на остров в Индийском океане. А потом вернулись сюда с кошкой и прожили 5.5 месяцев!',
  },
  {
    id: 6,
    year: 2016,
    country: 'Малайзия',
    coords: [3.74927, 102.157932],
    description:
      'Светлячки как гирлянда на деревьях, отель без окон, бессейн на крыше, вкусная еда на улицах. В общем, классическая юго-восточная Азия.',
  },
  {
    id: 7,
    year: 2016,
    country: 'Беларусь',
    coords: [52.858248, 27.701393],
    description: 'Посмотрели, как готовят поля к посевам, как чисто в Минске и погуляли в Несвиже',
  },
  {
    id: 8,
    year: 2016,
    country: 'Германия',
    coords: [51.228764, 10.551692],
    description:
      'Кёльн и Дюссельдорф. Говорят, это идельная страна для меня. Всё по правилам и расписанию. Кругом немецкий автопром. Настолько чётко, что прям скучно.',
  },
  {
    id: 9,
    year: 2016,
    country: 'Нидерланды',
    coords: [52.848781, 5.838421],
    description:
      'Пожалуй, одна из моих любимых стран. Воспитанное общество, эстетика, свобода и экологичность. Тут мы были в Амстердаме, Гааге и Роттердаме',
  },
  {
    id: 10,
    year: 2017,
    country: 'Бельгия',
    coords: [50.510867, 4.863748],
    description: 'В Брюсселе мы встретили Новый год, поспали под крышей и поели вкусного шоколада.',
  },
  {
    id: 11,
    year: 2017,
    country: 'Азербайджан',
    coords: [40.359953, 47.651476],
    description:
      'Страна гостеприимства, шашлыка и невероятных гор. А ещё тут мы чуть не упали в обрыв на грунтовом серпантине.',
  },
  {
    id: 12,
    year: 2017,
    country: 'Кипр',
    coords: [35.128223, 33.149774],
    description:
      'На Кипре мы овощили в отеле. Но сумели выбраться на аттракционы и на шоу, где нас в конце облили водой и хотели поджечь!',
  },
  {
    id: 13,
    year: 2017,
    country: 'Мальдивы',
    coords: [4.214899, 73.541641],
    description:
      'Потому что мечты должны сбываться. Посмотреть сверху на атоллы. Побывать на необитаемом острове. Созерцать млечный путь. Жить, а не проживать. Хотя бы 2 недели!',
  },
  {
    id: 14,
    year: 2017,
    country: 'Эстония',
    coords: [58.564388, 25.660789],
    description:
      'Узкие улочки, атмосфера праздника и, конечно же, Балтийское море под солнцем. Тут мы встретили Новый год.',
  },
  {
    id: 15,
    year: 2018,
    country: 'Латвия',
    coords: [56.896888, 25.8441],
    description:
      'В Латвию классно ехать на машине среди сосен и тумана. Приятно гулять по мощеным переулкам и слушать орган в Доском соборе',
  },
  {
    id: 16,
    year: 2018,
    country: 'Литва',
    coords: [55.508473, 23.600189],
    description:
      'Литва нам запомнится музеем, который никогда не заканчивается. По крайней мере, аудиогид так считает.',
  },
  {
    id: 17,
    year: 2018,
    country: 'Австрия',
    coords: [47.69646, 14.754613],
    description:
      'В Вене за выходные мы успели погреться на мартовском солнышке, поесть Захер и прогуляться в венском лесу.',
  },
  {
    id: 18,
    year: 2018,
    country: 'Португалия',
    coords: [39.489874, -8.448817],
    description:
      'Ещё одна страна из моего топа. Страна со сказочными мостами, океаном и природой. Порту поселился в моем сердце навсегда.',
  },
  {
    id: 19,
    year: 2018,
    country: 'Испания',
    coords: [39.159964, -3.512808],
    description:
      'Заехали для "галочки" в Виго. Тут африканцы торговали сумками из кожзама, а потом убегали от полиции. А ещё были школьницы в гольфах, что особенно запомнилось.',
  },
  {
    id: 20,
    year: 2018,
    country: 'Таиланд',
    coords: [16.378309, 101.307704],
    description:
      'Жаркое солнышко, дешевая и вкусная еда, место съемок фильма "Пляж" - в этом весь Пхукет. А Бангкок - вечная суета, одна сплошная пробка и духота.',
  },
  {
    id: 21,
    year: 2019,
    country: 'Польша',
    coords: [51.211428, 19.758436],
    description:
      'Неожидали от Польши крутых впечатлений, но она нам понравилась. И Варшава, и Краков, и поля рапса между ними.',
  },
  {
    id: 22,
    year: 2019,
    country: 'Словакия',
    coords: [48.672714, 19.638735],
    description:
      'Лучшее, что можно сказать про Братиславу, уже сказал мой муж: "Нелепо, невнятно, несуразно". Хотя Ружобмерок оказался милым местечком в горах.',
  },
  {
    id: 23,
    year: 2019,
    country: 'Венгрия',
    coords: [46.888476, 19.022778],
    description:
      'Будапешт показался коктейлем из набережных Питера, мостов Порту и замков Вены. Но купальни с термальной водой, гуляш и Эстерхази говорят о том, что Будапешт всё-таки нис чем не спутать.',
  },
  {
    id: 24,
    year: 2019,
    country: 'Чехия',
    coords: [49.574818, 15.267847],
    description:
      'Кушать трдельники и гулять по площадям и соборам Праги - обязательная чатсь программы. А ещё съездить в Блатну на авто, чтобы покормить с руки стадо оленей и ощутить себя Диснеевской принцессой.',
  },
  {
    id: 25,
    year: 2019,
    country: 'Италия',
    coords: [44.954457, 10.349284],
    description:
      'Пицца, экспрессивные итальянцы, теплая средиземноморская осень... Рим и Флоренция - недостаточный набор для посещения Италии, поэтому сюда мы обязательно вернемся.',
  },
];

const PIN_ICON = new L.Icon({
  iconUrl: pin,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const Map = () => {
  const [visitedCountries, setVisitedCountries] = useState([]);
  const refMap = useRef(null);

  const onFeatureGroupAdd = e => {
    refMap.current.leafletElement.fitBounds(e.target.getBounds());
  };

  useEffect(() => {
    setTimeout(() => {
      setVisitedCountries(VISITED_COUNTRIES);
    }, 5000);
  });

  return (
    <div className="map">
      <div className="container map__container">
        <Breadcrumbs
          crumbs={[
            {
              name: 'Главная',
              path: '/',
            },
            {
              name: 'Карта',
              path: '/map',
            },
          ]}
        />
        <h1>
          Hello, world (в хорошем смысле){' '}
          <span role="img" aria-label="Earth">
            🌏
          </span>
        </h1>
        <p>
          Просто представьте, что страны нашей планеты - это todo-лист, и вы можете ставить галочку на тех, что уже
          успели посетить! Мне пока есть, к чему стремиться.
        </p>
        <p>
          Карта использует API{' '}
          <a href="https://react-leaflet.js.org/" target="_blank" rel="noopener noreferrer">
            Leaflet
          </a>
          , но на его месте может быть и Google Maps, и YMaps.
        </p>
      </div>
      <LeafletMap center={DEFAULT_LOCATION} zoom={DEFAULT_ZOOM} zoomControl={false} ref={refMap} maxZoom={18}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {visitedCountries.length > 0 ? (
          <FeatureGroup onAdd={onFeatureGroupAdd}>
            <MarkerClusterGroup>
              {visitedCountries.map(country => (
                <Marker position={country.coords} icon={PIN_ICON} key={country.id}>
                  <Popup className="balloon" maxWidth={300}>
                    <p className="balloon__title">
                      {country.country}{' '}
                      <span>{Array.isArray(country.year) ? country.year.join(', ') : country.year}</span>
                    </p>
                    <p className="balloon__text">{country.description}</p>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </FeatureGroup>
        ) : null}
        <ZoomControl position="topright" />
      </LeafletMap>
    </div>
  );
};

export default Map;
