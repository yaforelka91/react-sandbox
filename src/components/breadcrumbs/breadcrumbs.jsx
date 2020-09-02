import React from 'react';
import { Link } from '@reach/router';
import './styles.scss';

const Breadcrumbs = ({ crumbs }) => {
  if (crumbs.length <= 1) {
    return null;
  }
  return (
    <ul className="breadcrumbs">
      {crumbs.map(({ name, path }, index) =>
        index + 1 === crumbs.length ? (
          <li className="breadcrumbs__item" key={name}>
            <span className="breadcrumbs__link">{name}</span>
          </li>
        ) : (
          <li className="breadcrumbs__item" key={name}>
            <Link className="breadcrumbs__link" key={name} to={path}>
              {name}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default Breadcrumbs;
