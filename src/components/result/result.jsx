import React from 'react'
import './styles.scss'

const Result = ({ list }) => {
  return (
    <ul className="result">
      {list.map(item => {
        return (
          <li key={item.title} className="result__item">
            <a className="result__pic" href={item.href}>
              <img src={item.thumbnail || 'http://placekitten.com/107/80'} alt={item.title} />
            </a>
            <div className="result__body">
              <h3 className="result__title">
                <a className="result__link" href={item.href}>
                  {item.title}
                </a>
              </h3>
              <p className="result__content">
                <b>Ingredients:</b>
                {'\u00A0'}
                {item.ingredients}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Result
