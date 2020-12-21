import { Fragment } from 'react';
import DetailProject from '../../components/molecules/detailProject';
import Navbar from '../../components/molecules/navbar';

export default function DetailProjectPage() {
  return (
    <Fragment>
      <Navbar />
      <DetailProject />
    </Fragment>
  );
}
