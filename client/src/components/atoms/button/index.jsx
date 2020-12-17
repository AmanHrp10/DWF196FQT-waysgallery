import { Fragment } from 'react';

export default function Button({ title, className, onClick }) {
  return (
    <Fragment>
      <button onClick={onClick} className={`btn ${className}`}>
        {title}
      </button>
    </Fragment>
  );
}
