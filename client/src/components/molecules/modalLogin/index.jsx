import { Fragment, useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import InputForm from '../../atoms/inputForm/index';
import Button from '../../atoms/button/index';
import { API, setToken } from '../../../config/api';
import './modal.css';
import { AppContext } from '../../../context/AppContext';
import { useHistory } from 'react-router-dom';
import ModalAlert from '../../atoms/modalAlert/index';

export default function ModalLogin({ onHide, show }) {
  const [state, dispatch] = useContext(AppContext);
  const [popUp, setPopUp] = useState(false);
  const [alert, setAlert] = useState({
    text: '',
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const router = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({ email, password });
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const response = await API.post('/login', body, config);
      console.log(response);
      if (response.data.status === 'Request failed') {
        setAlert({
          text: 'Login Failed',
        });
        setPopUp(true);
      }
      // ? Context
      dispatch({
        type: 'LOGIN',
        payload: response.data.data.user,
      });

      //? take a token
      setToken(response.data.data.user.token);
      setAlert({
        text: 'Login Succes',
      });
      setPopUp(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePopUp = () => {
    setPopUp(false);
    router.push('/');
    return show;
  };
  return (
    <Fragment>
      <Modal show={show} onHide={handlePopUp}>
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
            className='button-register btn-sm w-100 text-white '
            onClick={handleLogin}
          />
        </div>
      </Modal>
      <ModalAlert
        className='modal-alert'
        popUp={popUp}
        handlePopUp={handlePopUp}
        text={alert.text}
      />
    </Fragment>
  );
}
