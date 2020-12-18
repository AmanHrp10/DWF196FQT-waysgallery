import { Fragment, useContext, useEffect } from 'react';
import Button from '../../atoms/button';
import Profile from '../../../images/Profile.png';
import Thumbnail from '../../../images/thumbnail.png';
import './detailPost.css';
import { AppContext } from '../../../context/AppContext';

export default function DetailPost() {
  const [state] = useContext(AppContext);
  const { user } = state;

  useEffect(() => {
    return user;
  }, []);

  console.log(user);
  return (
    <Fragment>
      <div
        className='container'
        style={{ marginTop: '110px', padding: '0 200px' }}
      >
        <div className='header-post d-flex'>
          <div className='image-profile-detail-post'>
            <img src={Profile} alt='' width='100%' />
          </div>
          <div className='desc-post mt-1'>
            <h6 style={{ fontWeight: 'bold' }}>Title Post</h6>
            <p style={{ marginTop: '-10px' }}>Name User</p>
          </div>
          <div className='button-action ml-auto mt-2'>
            <Button title='Follow' className='button-cancel btn-sm px-4' />
            <Button
              title='Hire'
              className='button-post text-white ml-5 px-4 btn-sm'
            />
          </div>
        </div>
        <div className='image-post-preview mt-3'>
          <img src={Thumbnail} alt='' width='100%' />
        </div>
        <div className='greeting mt-5'>
          <p>
            <span style={{ fontWeight: 'bold' }}>Say Hello</span>,{' '}
            {user && user.name}
          </p>
          <p>
            {!user.greeting ? (
              <h3 className='text-secondary text-center'>
                Hello {user && user.name}
              </h3>
            ) : (
              user.greeting
            )}
          </p>
        </div>
      </div>
    </Fragment>
  );
}
