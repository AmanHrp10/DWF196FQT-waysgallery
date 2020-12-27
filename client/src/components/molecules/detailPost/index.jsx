import { Fragment, useContext, useEffect, useState } from 'react';
import Button from '../../atoms/button';
import DefaultProfile from '../../../images/defaultProfile.png';
import './detailPost.css';
import { AppContext } from '../../../context/AppContext';
import { useParams, useHistory } from 'react-router-dom';
import { API } from '../../../config/api';
import Skeleton from 'react-loading-skeleton';

export default function DetailPost() {
  const [state, dispatch] = useContext(AppContext);
  const [indexImage, setIndexImage] = useState(0);
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(true);
  let [isFollow, setIsFollow] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const router = useHistory();
  const { id } = useParams();

  //? Fetch Post
  const fetchDetailPost = async () => {
    try {
      //* Before data ready
      setLoading(true);

      const response = await API(`/post/${id}`);
      setPost(response.data.data.post);

      //* After Data ready
      setLoading(false);
      setIsFollow(false);

      const checkFollow = await API(
        `/follow/${response.data.data.post.user.id}`
      );
      checkFollow.data.data.follow === null
        ? setIsFollow(false)
        : setIsFollow(true);
    } catch (err) {
      console.log(err);
    }
  };

  //? Handle switch image preview
  const handleChangeImage = (e) => {
    setIndexImage(e.target.id);
  };

  const follow = async () => {
    try {
      await API.post(`/follow/${post.user.id}`);
      setIsFollow((isFollow = !isFollow));
    } catch (err) {
      console.log(err);
    }
  };

  const unFollow = async () => {
    try {
      await API.delete(`/follow/${post.user.id}`);
      setIsFollow((isFollow = !isFollow));
    } catch (err) {
      console.log(err);
    }
  };

  //? Side Effect
  useEffect(() => {
    fetchDetailPost();
  }, []);

  loading ? console.log('loading') : console.log(post.user.id);
  return loading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <div
        className='container'
        style={{ marginTop: '110px', padding: '0 200px' }}
      >
        <div className='header-post d-flex'>
          <div className='image-profile-detail-post'>
            <img
              style={{ cursor: 'pointer' }}
              onClick={
                user.id === post.user.id
                  ? () => router.push('/profile')
                  : () => router.push(`/detail-user/${post.user.id}`)
              }
              src={
                !post.user || !post.user.avatar
                  ? DefaultProfile
                  : `http://localhost:8000/uploads/${post.user.avatar}`
              }
              alt=''
              width='100%'
            />
          </div>
          <div className='desc-post mt-1'>
            <h6 style={{ fontWeight: 'bold' }}>{post.title}</h6>
            <p style={{ marginTop: '-10px' }}>
              {post.user && post.user.fullname}
            </p>
          </div>
          <div
            className='button-action ml-auto mt-2'
            style={{
              display: post.user && post.user.id === user.id ? 'none' : '',
            }}
          >
            <Button
              style={{ display: loading ? 'none' : '' }}
              title={isFollow ? 'Unfollow' : 'Follow'}
              onClick={isFollow ? unFollow : follow}
              className={
                isFollow
                  ? 'button-danger text-white btn-sm px-4'
                  : 'button-cancel btn-sm px-4'
              }
            />
            <Button
              onClick={() => router.push(`/hire/${post.user.id}`)}
              title='Hire'
              className='button-post text-white ml-3 px-4 btn-sm'
            />
          </div>
        </div>
        <div className='image-post-preview mt-3'>
          <img
            src={
              post.photos &&
              `http://localhost:8000/uploads/${post.photos[indexImage].image}`
            }
            alt=''
            width='100%'
            height='100%'
            style={{ borderRadius: '4px', objectFit: 'cover' }}
          />
        </div>
        <div className='sub-image d-flex'>
          {post.photos.map((photo, index) => (
            <img
              style={{
                marginRight: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              width='100%'
              key={index}
              id={index}
              src={`http://localhost:8000/uploads/${photo.image}`}
              alt=''
              onClick={(e) => handleChangeImage(e)}
            />
          ))}
        </div>
        <div className='greeting mt-5'>
          <p>
            <span style={{ fontWeight: 'bold' }}>Say Hello</span>,{' '}
            <span style={{ color: '#2FC4B2' }}>{user && user.name}</span>
          </p>
          <p>{post.description}</p>
        </div>
      </div>
    </Fragment>
  );
}
