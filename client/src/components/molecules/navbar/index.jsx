import { Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Brand from '../../../images/brand.png';
import Profile from '../../../images/Profile1.png';
import Button from '../../atoms/button';
import { FaRegUser } from 'react-icons/fa';
import { BsFolderSymlink } from 'react-icons/bs';
import { GoBook } from 'react-icons/go';
import './navbar.css';

export default function Navbar() {
  const handleUpload = () => {
    window.alert('Hallo');
  };
  return (
    <Fragment>
      <nav
        className='nav navbar-dark border mb-4'
        style={{ marginTop: '-10px' }}
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
                    width='100%'
                    style={{ borderRadius: '70%' }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
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
                  <Dropdown.Item>
                    {' '}
                    <BsFolderSymlink
                      size='1.3em'
                      style={{ marginRight: '9px', color: 'red' }}
                    />{' '}
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
