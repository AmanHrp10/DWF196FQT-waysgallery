import { Fragment, useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Brand from '../../../images/brand.png';
import Profile from '../../../images/Profile1.png';
import Button from '../../atoms/button';
import { FaRegUser } from 'react-icons/fa';
import { BsFolderSymlink } from 'react-icons/bs';
import { GoBook } from 'react-icons/go';
import './navbar.css';
import { AppContext } from '../../../context/AppContext';

export default function Navbar() {
  const [state, dispatch] = useContext(AppContext);

  const router = useHistory();
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    router.push('landing');
  };

  const handleUpload = () => {
    router.push('/upload');
  };
  return (
    <Fragment>
      <nav
        className='nav border mb-4 fixed-top '
        style={{ marginTop: '-10px', background: '#fff' }}
      >
        <div className='container'>
          <div className='navbar'>
            <div className='logo-brand'>
              <Link to='/'>
                <img src={Brand} alt='' width='80%' />
              </Link>
            </div>
            <div className='logo-profile navbar-right d-flex'>
              <Button
                title='Upload'
                className='button-upload text-white'
                onClick={handleUpload}
              />
              <Dropdown>
                <Dropdown.Toggle>
                  <img
                    src={Profile}
                    alt=''
                    width='70%'
                    style={{ borderRadius: '70%' }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => router.push('/profile')}>
                    <FaRegUser
                      size='1.3em'
                      style={{
                        marginRight: '9px',
                        color: '#2FC4B2',
                      }}
                    />
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <GoBook
                      size='1.3em'
                      style={{ marginRight: '9px', color: '#00E016' }}
                    />
                    Order
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <BsFolderSymlink
                      size='1.3em'
                      style={{ marginRight: '9px', color: 'red' }}
                    />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
