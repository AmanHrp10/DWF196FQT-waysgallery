import { Fragment } from 'react';
import Navbar from '../../components/molecules/navbar';
import UploadPost from '../../components/molecules/uploadPost/index';

export default function UploadPage() {
  return (
    <Fragment>
      <Navbar />
      <UploadPost />
    </Fragment>
  );
}
