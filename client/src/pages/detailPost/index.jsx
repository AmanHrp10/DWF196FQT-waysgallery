import { Fragment } from 'react';
import DetailPost from '../../components/molecules/detailPost';
import Navbar from '../../components/molecules/navbar';

export default function DetailPostPage() {
  return (
    <Fragment>
      <Navbar />
      <DetailPost />
    </Fragment>
  );
}
