import { Fragment } from 'react';
import DetailUser from '../../components/molecules/detailUser';
import Navbar from '../../components/molecules/navbar';

export default function DetailUserPage() {
  return (
    <Fragment>
      <Navbar />
      <DetailUser />
    </Fragment>
  );
}
