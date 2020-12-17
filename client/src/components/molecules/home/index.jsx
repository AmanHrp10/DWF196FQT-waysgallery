import { Fragment } from 'react';
import Thumbnail from '../../../images/thumbnail.png';
import Profile from '../../../images/Profile.png';
import Code from '../../../images/landing.png';
import './home.css';

export default function TodayPosts() {
  return (
    <Fragment>
      <div className='container'>
        <h5>Today's Posts</h5>
        <div className='row mt-4 img-home'>
          <img src={Thumbnail} alt='' />
          <img src={Code} alt='' />
          <img src={Thumbnail} alt='' />
          <img src={Thumbnail} alt='' />
          <img src={Thumbnail} alt='' />
          <img src={Profile} alt='' />
          <img src={Thumbnail} alt='' />
          <img src={Thumbnail} alt='' />
          <img src={Thumbnail} alt='' />
        </div>
      </div>
    </Fragment>
  );
}
