import { Fragment } from 'react';
import Navbar from '../../components/molecules/navbar/index';
import ProfilePage from '../../components/molecules/profile';

export default function Profile() {
  return (
    <Fragment>
      <Navbar />
      <ProfilePage />
    </Fragment>
  );
}
