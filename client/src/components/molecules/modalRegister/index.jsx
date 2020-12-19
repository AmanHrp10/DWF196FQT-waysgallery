import { Fragment, useEffect, useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import InputForm from '../../atoms/inputForm/index';
import Button from '../../atoms/button/index';
import './modalRegister.css';
import { API, setToken } from '../../../config/api';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';

export default function ModalRegister({ onHide, show, isRegister }) {
  const [newUser, setNewUser] = useState();
  const [state, dispatch] = useContext(AppContext);
  const { user } = state;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
  });

  const router = useHistory();
  const { email, password, fullname } = formData;

  const handlePost = async (e) => {
    e.preventDefault();
    const body = formData;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await API.post('/register', body, config);

      setFormData({
        email: '',
        password: '',
        fullname: '',
      });
      //? Context
      dispatch({
        type: 'LOGIN',
        payload: response.data.data.user,
      });

      //? take a token
      setToken(response.data.data.user.token);

      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <Modal show={show} onHide={onHide}>
        <div className='wrapper-modal'>
          <h3 style={{ color: '#2FC4B2', fontWeight: '900' }}>Register</h3>
          <InputForm
            type='text'
            title='Email'
            className='mb-3'
            name='email'
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            type='password'
            title='Password'
            className='mb-3'
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            type='text'
            title='Full Name'
            className='mb-3'
            name='fullname'
            onChange={(e) => handleChange(e)}
          />
          <Button
            title='Register'
            className='button-register btn-sm w-100'
            onClick={(e) => handlePost(e)}
          />
        </div>
      </Modal>
    </Fragment>
  );
}
