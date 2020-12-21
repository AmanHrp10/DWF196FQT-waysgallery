import { Fragment } from 'react';

export default function InputForm({
  type,
  title,
  onChange,
  className,
  name,
  value,
  ref,
  onClick,
  label,
}) {
  return (
    <Fragment>
      <input
        onClick={onClick}
        onChange={onChange}
        type={type}
        className={`form-control ${className}`}
        placeholder={title}
        name={name}
        value={value}
        autoComplete='off'
      />
    </Fragment>
  );
}
