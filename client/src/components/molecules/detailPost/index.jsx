import { Fragment, useContext, useEffect, useState } from 'react';
import Button from '../../atoms/button';
import DefaultProfile from '../../../images/defaultProfile.png';
import './detailPost.css';
import { AppContext } from '../../../context/AppContext';
import { useParams, useHistory } from 'react-router-dom';
import { API } from '../../../config/api';

export default function DetailPost() {
  const [state] = useContext(AppContext);
  const { user } = state;

  const [post, setPost] = useState('');

  const router = useHistory();
  const { id } = useParams();
  const fetchDetailPost = async () => {
    try {
      const response = await API(`/post/${id}`);

      setPost(response.data.data.post);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetailPost();
  }, []);

  console.log(post);
  return (
    <Fragment>
      <div
        className='container'
        style={{ marginTop: '110px', padding: '0 200px' }}
      >
        <div className='header-post d-flex'>
          <div
            className='image-profile-detail-post'
            onClick={() => router.push(`/detail-user/${post.user.id}`)}
          >
            <img
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
          <div className='button-action ml-auto mt-2'>
            <Button title='Follow' className='button-cancel btn-sm px-4' />
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
              `http://localhost:8000/uploads/${post.photos[0].image}`
            }
            alt=''
            width='100%'
          />
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
