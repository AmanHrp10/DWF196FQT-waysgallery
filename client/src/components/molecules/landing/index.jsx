import { Fragment, useState } from 'react';
import Logo from '../../../images/landing.png';
import WaysGallery from '../../../images/waysGallery.png';
import LogoChild from '../../../images/logoChild.png';
import Text from '../../../images/text-description.png';
import './landing.css';
import Button from '../../atoms/button';
import ModalLogin from '../modalLogin';
import ModalRegister from '../modalRegister';

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => setShowRegister(true);

  return (
    <Fragment>
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-6'>
            <img
              src={WaysGallery}
              alt=''
              width='324px'
              style={{ marginTop: '120px' }}
            />
            <img
              src={LogoChild}
              alt=''
              width='150px'
              style={{ marginTop: '40px', marginLeft: '-120px' }}
            />
            <img src={Text} alt='' width='400px' />
            <div className='wrapper-button pt-4'>
              <Button
                title='Join Now'
                className='button-register btn-sm text-white'
                onClick={handleShowRegister}
              />
              <Button
                title='Login'
                className='button-login btn-sm px-4 ml-4'
                onClick={handleShowLogin}
              />
            </div>
          </div>
          <div className='col-6'>
            <img src={Logo} alt='' width='550px' />
          </div>
        </div>
      </div>

      <ModalLogin isLogin show={showLogin} onHide={handleCloseLogin} />
      <ModalRegister show={showRegister} onHide={handleCloseRegister} />
    </Fragment>
  );
}
