import { Fragment } from 'react';
import Gallery from 'react-photo-gallery';

export default function Following({ key, photos, onClick }) {
  return (
    <Fragment>
      <div className='container mt-3'>
        <h5>Following Post</h5>
        <hr />
        <div className=' mt-4 img-home'>
          {photos.length === 0 ? (
            <h1
              className='text-center'
              style={{
                marginTop: '190px',
                fontWeight: 'bold',
                color: '#0202025e',
              }}
            >
              Not Post
            </h1>
          ) : (
            <Gallery key={key} photos={photos} onClick={onClick} />
          )}
        </div>
      </div>
    </Fragment>
  );
}
