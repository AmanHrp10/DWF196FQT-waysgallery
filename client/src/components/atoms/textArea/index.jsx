export default function Textarea({
  title,
  name,
  cols,
  rows,
  onChange,
  className,
}) {
  return (
    <textarea
      name={name}
      cols={cols}
      rows={rows}
      placeholder={title}
      onChange={onChange}
      className={`form-control ${className}`}
    />
  );
}
