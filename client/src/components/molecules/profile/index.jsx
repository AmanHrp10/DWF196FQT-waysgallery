import { Fragment, useContext } from 'react';
import Button from '../../atoms/button';
import Profile from '../../../images/Profile.png';
import './profile.css';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import { Skeleton } from 'react-loading-skeleton';

export default function ProfilePage() {
  const [state] = useContext(AppContext);
  const { user } = state;

  //? post Index latest
  const latesPostIndex = user.posts.length - 1;

  //? Photos Index latest from Post
  const latesPhotosIndex = user.posts[latesPostIndex].photos.length - 1;

  const latesPhotoPost = user.posts[latesPostIndex].photos[latesPhotosIndex];

  const router = useHistory();
  return !user.posts && !user.arts ? (
    <Skeleton />
  ) : (
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
            <div
              className='thumbnail-profile'
              onClick={() =>
                router.push(`/detail-post/${user.posts[latesPostIndex].id}`)
              }
            >
              <img
                src={`http://localhost:8000/uploads/${latesPhotoPost.image}`}
                alt=''
                width='100%'
                height='100%'
                style={{ padding: '24px', backgroundSize: 'cover' }}
              />
              <div className='background'></div>
            </div>
          </div>
        </div>
        <div className='my-work my-5'>
          <h5 className='text-bold'>My Works</h5>
          <div className='row'>
            {user.arts.map((art) => {
              return (
                <div className='col-3 p-2'>
                  <img
                    src={`http://localhost:8000/uploads/${art.artImage}`}
                    alt=''
                    width='100%'
                    height='100%'
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
