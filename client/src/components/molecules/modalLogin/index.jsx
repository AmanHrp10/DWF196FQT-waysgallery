import { Fragment, useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import InputForm from '../../atoms/inputForm/index';
import Button from '../../atoms/button/index';
import { API, setToken } from '../../../config/api';
import './modal.css';
import { AppContext } from '../../../context/AppContext';
import { useHistory } from 'react-router-dom';

export default function ModalLogin({ onHide, show, isLogin }) {
  const [state, dispatch] = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const router = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({ email, password });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await API.post('/login', body, config);
      console.log(response);

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
          <h3 style={{ color: '#2FC4B2', fontWeight: '900' }}>Login</h3>
          <InputForm
            type='text'
            name='email'
            value={email}
            title='Email'
            className='mb-3'
            onChange={(e) => handleChange(e)}
          />
          <InputForm
            type='password'
            title='Password'
            value={password}
            className='mb-3'
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <Button
            title='Login'
            className='button-register btn-sm w-100'
            onClick={(e) => handleLogin(e)}
          />
        </div>
      </Modal>
    </Fragment>
  );
}
