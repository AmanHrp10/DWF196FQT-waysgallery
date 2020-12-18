import { Fragment } from 'react';
import EditProfile from '../../components/molecules/editProfile';
import Navbar from '../../components/molecules/navbar';

export default function EditProfilePage() {
  return (
    <Fragment>
      <Navbar />
      <EditProfile />
    </Fragment>
  );
}
