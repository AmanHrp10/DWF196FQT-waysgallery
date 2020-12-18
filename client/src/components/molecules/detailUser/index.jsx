import { Fragment } from 'react';
import Button from '../../atoms/button';
import Thumbnail from '../../../images/thumbnail.png';
import Profile from '../../../images/Profile.png';
import { useHistory } from 'react-router-dom';

export default function DetailUser() {
  const router = useHistory();
  return (
    <Fragment>
      <div className='container' style={{ marginTop: '110px' }}>
        <div className='row'>
          <div className='col-6'>
            <div className='image-profile'>
              <img src={Profile} alt='' width='100%' />
            </div>
            <h5>Nama</h5>
            <h2>This is a greeting</h2>

            <div className='button-detail-user'>
              <Button
                title='Follow'
                className='button-cancel btn-sm mt-4 mr-3 px-4'
                onClick={() => router.push('/edit-profile')}
              />
              <Button
                title='Hire'
                className='button-post text-white btn-sm mt-4 px-4'
                onClick={() => router.push('/hire')}
              />
            </div>
          </div>
          <div className='col-6 justify-content-right'>
            <div className='thumbnail-profile'>
              <img
                src={Thumbnail}
                alt=''
                width='100%'
                style={{ padding: '24px' }}
              />
              <div className='background'></div>
            </div>
          </div>
        </div>
        <div className='my-work mt-5'>
          <h5 className='text-bold'>My Works</h5>
          <div className='row justify-content-around'>
            <div className='col-3'>
              <img src={Thumbnail} alt='' />
            </div>
            <div className='col-3'>
              <img src={Thumbnail} alt='' />
            </div>
            <div className='col-3'>
              <img src={Thumbnail} alt='' />
            </div>
            <div className='col-3'>
              <img src={Thumbnail} alt='' />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
