import { Fragment, useEffect, useState } from 'react';
import Button from '../../atoms/button';
import { useHistory, useParams } from 'react-router-dom';
import { API } from '../../../config/api';
import Loading from '../../atoms/loading';

export default function DetailUser() {
  const [user, setUser] = useState('');
  const [postLates, setPostLates] = useState('');
  const [loading, setLoading] = useState(true);
  let [isFollow, setIsFollow] = useState(true);
  const localUser = JSON.parse(localStorage.getItem('user'));

  const router = useHistory();
  const { id } = useParams();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await API(`/user/${id}`);

      setUser(response.data.data.user);
      const latesPost =
        response.data.data.user.posts &&
        response.data.data.user.posts
          .sort((a, b) => {
            return b.id - a.id;
          })
          .slice(0, 1);
      setPostLates(latesPost);

      setLoading(false);
      setIsFollow(false);

      const checkFollow = await API(`/follow/${id}`);
      checkFollow.data.data.follow === null
        ? setIsFollow(false)
        : setIsFollow(true);
    } catch (err) {
      console.log(err);
    }
  };

  const follow = async () => {
    try {
      await API.post(`/follow/${id}`);
      setIsFollow((isFollow = !isFollow));
    } catch (err) {
      console.log(err);
    }
  };

  const unFollow = async () => {
    try {
      await API.delete(`/follow/${id}`);
      setIsFollow((isFollow = !isFollow));
    } catch (err) {
      console.log(err);
    }
  };

  const imageLates = postLates[0] ? postLates[0].photos[0].image : null;

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(isFollow);
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className='container' style={{ marginTop: '110px' }}>
        <div className='row'>
          <div className='col-6'>
            <div className='image-profile'>
              <img src={user && user.avatar} alt='' width='100%' />
            </div>
            <h5>{user.fullname}</h5>
            <h2>{user.greeting}</h2>

            <div className='button-detail-user'>
              {user.id === localUser.id ? (
                <Button
                  title='Edit Profile'
                  className='button-post text-white btn-sm mt-5'
                  onClick={() => router.push('/edit-profile')}
                />
              ) : (
                <>
                  <Button
                    onClick={isFollow ? unFollow : follow}
                    title={isFollow ? 'Unfollow' : 'Follow'}
                    className={
                      isFollow
                        ? 'button-danger text-white btn-sm mt-4 mr-3 px-4'
                        : 'button-cancel btn-sm mt-4 mr-3 px-4'
                    }
                  />
                  <Button
                    title='Hire'
                    className='button-post text-white btn-sm mt-4 px-4'
                    onClick={() => router.push(`/hire/${user.id}`)}
                  />
                </>
              )}
            </div>
          </div>
          <div className='col-6 justify-content-right'>
            <div
              className='thumbnail-profile'
              onClick={() => router.push(`/detail-post/${postLates[0].id}`)}
            >
              <img
                src={imageLates && imageLates}
                alt=''
                width='100%'
                height='100%'
                style={{ padding: '24px', objectFit: 'fill' }}
              />
              <div className='background'></div>
            </div>
          </div>
        </div>
        <div className='my-work mt-5'>
          <h5 className='text-bold'>My Works</h5>
          <div className='row justify-start'>
            {user.arts.length === 0 ? (
              <h1 className='text-secondary mt-5 mx-auto' style={{}}>
                Not art
              </h1>
            ) : (
              user.arts &&
              user.arts
                .sort((a, b) => b.id - a.id)
                .map((image, index) => (
                  <div className='col-3 mb-3' key={index}>
                    <img
                      src={image.artImage}
                      alt=''
                      width='100%'
                      height='100%'
                      style={{ borderRadius: '4px', objectFit: 'fill' }}
                    />
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
