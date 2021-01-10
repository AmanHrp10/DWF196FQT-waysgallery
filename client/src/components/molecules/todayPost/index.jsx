import { Fragment, useState, useEffect } from 'react';
import { API } from '../../../config/api';
import Gallery from 'react-photo-gallery';
import Moment from 'moment';

export default function TodaysPost({ key, photos, onClick }) {
  // const getTime = (time) => {
  //   const d = new Date();
  //   const date = 24 * 60 * 60;
  //   const today = d + date;
  //   // const startDate = date.getDate();
  //   // const result = time + today;
  //   console.log(d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds());
  //   console.log(time.getTime() / (date * 60 * 4));
  //   console.log(Moment(time).format());
  // };
  // const getData = async () => {
  //   try {
  //     const response = await API('/posts');
  //     // console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // const date = new Date();
  // // console.log(date);
  // getTime(date);
  return (
    <Fragment>
      {/* <h2 className='text-secondary text-center' style={{ marginTop: '150px' }}>
        Not a Post
      </h2> */}

      <div className='container'>
        <h5>All Posts</h5>
        <hr />
        <div className='mt-4 img-home'>
          <Gallery
            key={key}
            photos={photos}
            onClick={onClick}
            className='gallery-photo'
            direction={'row'}
          />
        </div>
      </div>
    </Fragment>
  );
}
