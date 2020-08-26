import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Result from '../result/result';
import './styles.scss';
import { ReactComponent as Cross } from '../../images/icons/cross.svg';

const RAPIDAPI_API_URL = 'https://recipe-puppy.p.rapidapi.com';

const RAPIDAPI_REQUEST_HEADERS = {
    'X-RapidAPI-Host': 'recipe-puppy.p.rapidapi.com',
    'X-RapidAPI-Key': '75d8c28dbdmshb9ef2a564c288cbp1f8ac4jsn22dc7daa4301',
};

const Search = () => {
    const [recipe, setRecipe] = useState('');
    const [recipeList, setList] = useState([]);

    return (
        <div>
            <h1>Для искателей <span role='img' aria-label='Search'>🔎</span> и ценителей <span role='img' aria-label='Omelette'>🍳</span></h1>
            <p>
                Все любят поесть. Поэтому почему бы не поискать рецепт какого-нибудь блюда?
                Так как запрос идет к англоязычному ресурсу, то придется уметь в английский (или просто отправить пустую строку!)
                За предоставленное API благодарим <a href="http://www.recipepuppy.com/" target="_blank" rel="noopener noreferrer">Recipe Puppy</a>
            </p>
            <p>
                Для запросов к API используется Axios, вывод результата происходит после нажатия кнопки отправки.
            </p>
            <form className="search-form form" noValidate onSubmit={(evt) => {
                evt.preventDefault();

                axios
                .get(`${RAPIDAPI_API_URL}/?q=${recipe}`, { headers: RAPIDAPI_REQUEST_HEADERS })
                .then(response => {
                    setList(response.data.results);
                })
                .catch(error => console.error('On get student error', error))
            }}>
                <div className="search-form__wrapper">
                    <label className="visually-hidden" htmlFor="recipe">Введите название блюда:</label>
                    <input
                        id="recipe"
                        type="search"
                        className="search-form__input form__input"
                        placeholder="Omelet..."
                        value={recipe}
                        onChange={(evt) => {setRecipe(evt.target.value)}}
                    />
                    <button className="search-form__reset" type="button" onClick={() => {setRecipe('')}}>
                        <span className="visually-hidden">Очистить</span>
                        <Cross title="Очистить" />
                    </button>
                </div>
                
                <button className="btn search-form__confirm" type="submit">Искать</button>
            </form>
            <Result list={recipeList} />
        </div>
    );
}

export default Search;