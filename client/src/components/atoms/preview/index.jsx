import { useEffect, useState } from 'react';
import './preview.css';

export default function Preview({ file, isMainPreview }) {
  const [filename, setFilename] = useState();
  const getPreview = () => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFilename(reader.result);
    };
  };

  useEffect(() => {
    getPreview();
  }, []);

  return isMainPreview ? (
    <img
      src={filename}
      alt='preview'
      className='project-photo-preview-primary'
    />
  ) : (
    <img
      src={filename}
      alt='preview'
      className='project-photo-preview-secondary'
    />
  );
}
