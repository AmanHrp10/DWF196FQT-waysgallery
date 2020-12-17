import { Fragment } from 'react';

export default function InputForm({
  type,
  title,
  onChange,
  className,
  name,
  value,
}) {
  return (
    <Fragment>
      <input
        onChange={onChange}
        type={type}
        className={`form-control ${className}`}
        placeholder={title}
        name={name}
        value={value}
      />
    </Fragment>
  );
}
