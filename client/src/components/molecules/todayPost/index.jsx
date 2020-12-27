import { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API } from '../../../config/api';
import Moment from 'moment';

export default function TodaysPost() {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    const d = new Date();

    const date = Math.floor(d.setDate(d.getDate()));

    console.log(Moment(date).format());
    try {
      const response = await API('/posts');

      const coba = await API(`/posts?id=7`);
      console.log(coba.data.data);

      const dataPost = response.data.data.posts;

      //? init array
      let photo = [];
      for (let i = 0; i < dataPost.length; i++) {
        const datepost = new Date(dataPost[i].createdAt);
        const d = new Date();

        const date = Math.floor(d.setDate(d.getDate() - 7) / 1000);

        // console.log(date);
        // console.log(datepost / 1000);
        // console.log(today);
        photo[i] = {
          src:
            dataPost[i].photos.length === 0
              ? null
              : `http://localhost:8000/uploads/${dataPost[i].photos[0].image}`,
          width: 5,
          height: i % 2 == 0 ? 3 : 4,
          to: `/detail-post/${dataPost[i].id}`,
          id: dataPost[i].id,
          // createdAt: date,
        };
      }

      photo.sort((a, b) => b.id - a.id);

      setPosts(photo);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(posts);
  return (
    <Fragment>
      <h1>Todays Post</h1>
    </Fragment>
  );
}
