import { Fragment } from 'react';
import Navbar from '../../components/molecules/navbar/index';
import Profile from '../../components/molecules/profile';

export default function ProfilePage() {
  return (
    <Fragment>
      <Navbar />
      <Profile />
    </Fragment>
  );
}
