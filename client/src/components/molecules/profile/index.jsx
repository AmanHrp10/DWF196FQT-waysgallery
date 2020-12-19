import { Fragment, useContext } from 'react';
import Button from '../../atoms/button';
import Thumbnail from '../../../images/thumbnail.png';
import Profile from '../../../images/Profile.png';
import './profile.css';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';

export default function ProfilePage() {
  const [state] = useContext(AppContext);
  const { user } = state;

  console.log(user);

  const router = useHistory();
  return (
    <Fragment>
      <div className='container' style={{ marginTop: '110px' }}>
        <div className='row'>
          <div className='col-6'>
            <div className='image-profile'>
              <img
                src={
                  !user.avatar
                    ? Profile
                    : `http://localhost:8000/uploads/${user.avatar}`
                }
                alt=''
                width='100%'
              />
            </div>
            <h5>{!user ? 'Random' : user.name}</h5>
            <h2>{!user.greeting ? 'Say Hello' : user.greeting}</h2>

            <Button
              title='Edit Profile'
              className='button-post text-white btn-sm mt-5'
              onClick={() => router.push('/edit-profile')}
            />
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
