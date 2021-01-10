import { Fragment } from 'react';
import Gallery from 'react-photo-gallery';
import './home.css';

export default function Home({ key, photos, onClick }) {
  return (
    <Fragment>
      <div className='container'>
        <h5>All Posts</h5>
        <hr />
        <div className='mt-4 img-home'>
          <Gallery
            key={key}
            photos={photos}
            onClick={onClick}
            className='gallery-photo'
            direction={'row'}
          />
        </div>
      </div>
    </Fragment>
  );
}
