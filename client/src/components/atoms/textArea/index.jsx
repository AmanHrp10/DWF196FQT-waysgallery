export default function Textarea({
  title,
  name,
  cols,
  rows,
  onChange,
  className,
  value,
}) {
  return (
    <textarea
      name={name}
      cols={cols}
      rows={rows}
      placeholder={title}
      onChange={onChange}
      className={`form-control ${className}`}
      value={value}
    />
  );
}
