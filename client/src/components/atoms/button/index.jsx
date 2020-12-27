import { Fragment } from 'react';

export default function Button({ title, className, onClick, style, type, id }) {
  return (
    <Fragment>
      <button
        id={id}
        type={type}
        onClick={onClick}
        className={`btn ${className}`}
        style={style}
      >
        {title}
      </button>
    </Fragment>
  );
}
