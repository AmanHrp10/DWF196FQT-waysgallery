import { Fragment, useEffect, useState } from 'react';
import './home.css';
import { API } from '../../../config/api';
import Gallery from 'react-photo-gallery';
import { useHistory } from 'react-router-dom';

export default function TodayPosts() {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const router = useHistory();

  const fetchPost = async () => {
    try {
      const response = await API('/posts');

      const dataPost = response.data.data.posts;

      //? init array
      let photo = [];
      for (let i = 0; i < dataPost.length; i++) {
        photo[i] = {
          src:
            dataPost[i].photos.length === 0
              ? null
              : `http://localhost:8000/uploads/${dataPost[i].photos[0].image}`,
          width: 3,
          height: i % 2 === 0 ? 4 : 2,
          to: `/detail-post/${dataPost[i].id}`,
          id: dataPost[i].id,
        };
      }
      setPosts(photo);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    const to = e.target.getAttribute('to');
    router.push(to);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <Fragment>
      <div className='container'>
        <h5>Today's Posts</h5>
        <div className='row mt-4 img-home'>
          <Gallery key={posts.id} photos={posts} onClick={handleClick} />
        </div>
      </div>
    </Fragment>
  );
}
