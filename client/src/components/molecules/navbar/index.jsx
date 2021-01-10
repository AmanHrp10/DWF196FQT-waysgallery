import { Fragment, useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Brand from '../../../images/brand.png';
import DefaultProfile from '../../../images/defaultProfile.png';
import Button from '../../atoms/button';
import { FaRegUser } from 'react-icons/fa';
import { BsFolderSymlink } from 'react-icons/bs';
import { GoBook } from 'react-icons/go';
import './navbar.css';
import { AppContext } from '../../../context/AppContext';
import { API } from '../../../config/api';

export default function Navbar() {
  const [state, dispatch] = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const router = useHistory();
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    router.push('landing');
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await API('/user');
      const userFetch = response.data.data.user;
      setUser({ ...userFetch, user });

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
                  <div className='image-navbar navbar-brand'>
                    <img
                      src={loading ? null : JSON.parse(user.avatar).path}
                      alt=''
                      width='100%'
                      height='100%'
                      style={{ borderRadius: '100%', objectFit: 'cover' }}
                    />
                  </div>
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
                  <Dropdown.Item onClick={() => router.push('/transaction')}>
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
