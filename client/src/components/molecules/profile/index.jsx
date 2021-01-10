import { Fragment, useState, useEffect } from 'react';
import Button from '../../atoms/button';
import DefaultProfile from '../../../images/defaultProfile.png';
import './profile.css';
import { useHistory } from 'react-router-dom';
import { API } from '../../../config/api';
import Loading from '../../atoms/loading';

export default function Profile() {
  const [profile, setProfile] = useState('');
  const [postLates, setPostLates] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await API('/user');
      setProfile(response.data.data.user);

      const latesPost =
        response.data.data.user.posts &&
        response.data.data.user.posts
          .sort((a, b) => {
            return b.id - a.id;
          })
          .slice(0, 1);
      setPostLates(latesPost);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const imageLates = postLates[0] ? postLates[0].photos[0].image : null;

  const router = useHistory();

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className='container' style={{ marginTop: '110px' }}>
        <div className='row'>
          <div className='col-6'>
            <div className='image-profile'>
              <img
                src={JSON.parse(profile.avatar).path}
                alt=''
                width='100%'
                style={{ backgroundSize: 'cover' }}
              />
            </div>
            <h5>{!profile ? 'Random' : profile.fullname}</h5>
            <h2>{!profile.greeting ? 'Say Hello' : profile.greeting}</h2>

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
                !imageLates
                  ? router.push('/upload')
                  : router.push(`/detail-post/${postLates[0].id}`)
              }
            >
              <img
                src={imageLates}
                alt='Lates Post'
                width='100%'
                height='100%'
                style={{
                  padding: '24px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
              <div className='background'></div>
            </div>
          </div>
        </div>
        <div className='my-work my-5'>
          <h5 className='text-bold'>My Works</h5>
          <div className='row'>
            {profile.arts.length === 0 ? (
              <h1 className='text-secondary mt-5 mx-auto' style={{}}>
                Not art
              </h1>
            ) : (
              profile.arts &&
              profile.arts
                .sort((a, b) => b.id - a.id)
                .map((art) => {
                  return (
                    <div className='col-3 p-2' style={{ height: '200px' }}>
                      <img
                        src={art.artImage}
                        alt=''
                        width='100%'
                        height='100%'
                      />
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
