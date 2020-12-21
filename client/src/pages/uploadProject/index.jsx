import { Fragment } from 'react';
import Navbar from '../../components/molecules/navbar';
import UploadProject from '../../components/molecules/uploadProject/index';

export default function UploadProjectPage() {
  return (
    <Fragment>
      <Navbar />
      <UploadProject />
    </Fragment>
  );
}
