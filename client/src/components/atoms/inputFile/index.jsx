import { useRef, useState } from 'react';
import './inputFile.css';

export default function InputFile({
  title,
  icon,
  name,
  value,
  onChange,
  width,
  height,
  borderRadius,
}) {
  const hiddenFileInput = useRef(null);
  const [preview, setPreview] = useState('');
  const [text, setText] = useState(title);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    let reader = new FileReader();
    let files = e.target.files[0];
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(files);
    setText(null);
  };
  return (
    <div
      className='input-file-wrapper'
      style={{
        width: `${width}`,
        height: `${height}`,
        borderStyle: 'dashed',
        borderRadius: `${borderRadius}`,
      }}
    >
      <div className='input-file' onClick={handleClick} onChange={onChange}>
        <div
          className='icon-upload d-flex flex-column'
          style={{ color: '#1b1b1b' }}
        >
          {!preview ? (
            icon
          ) : (
            <img width='100%' alt='' src={preview} style={{ padding: '5px' }} />
          )}

          <input
            type='file'
            ref={hiddenFileInput}
            onChange={handleChange}
            name={name}
            value={value}
          />
          {text}
        </div>
      </div>
    </div>
  );
}
