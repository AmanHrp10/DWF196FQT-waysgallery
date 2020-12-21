import { Fragment } from 'react';

export default function Button({ title, className, onClick, style }) {
  return (
    <Fragment>
      <button onClick={onClick} className={`btn ${className}`} style={style}>
        {title}
      </button>
    </Fragment>
  );
}
