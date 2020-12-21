import { Fragment, useState, useContext } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import InputForm from '../../atoms/inputForm/index';
import Button from '../../atoms/button/index';
import { AiOutlineCamera } from 'react-icons/ai';
import InputFile from '../../atoms/inputFile/index';
import './editProfile.css';
import { AppContext } from '../../../context/AppContext';
import { useHistory } from 'react-router-dom';
import { API } from '../../../config/api';

export default function EditProfile() {
  const [state, dispatch] = useContext(AppContext);
  const { user } = state;
  const [editUser, setEditUser] = useState(user);
  const [formData, setFormData] = useState({
    avatar: '',
    greeting: '',
    fullname: user.fullname,
    arts: [],
  });

  const [fileData, setFileData] = useState({});

  const { avatar, greeting, fullname, arts } = formData;
  const router = useHistory();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('avatar', avatar);
    body.append('greeting', greeting);
    body.append('fullname', fullname);
    body.append('arts', arts);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const response = await API.patch(`/user/${user.id}`, body, config);
      const newProfile = response.data.data.user;

      dispatch({
        type: 'EDIT_USER',
        payload: newProfile,
      });
      router.push('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const handleFile = (e) => {
    setFileData({
      images: [...fileData.images, e.target.files[0]],
    });
  };

  const handleForm = (e) => {
    const updateForm = {
      ...formData,
    };
    console.log(e.target.type);
    updateForm[e.target.name] =
      e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData(updateForm);
  };

  console.log(formData);
  return (
    <Fragment>
      <div className='container' style={{ marginTop: '110px' }}>
        <div className='row wrapper-upload-post mt-5'>
          <div className='col-8'>
            <InputFile
              name='arts'
              onChange={(e) => handleForm(e)}
              width='520px'
              height='300px'
              icon={<AiOutlineCloudUpload size='10em' color='#e7e7e7' />}
              title={
                <p>
                  <span style={{ color: '#2FC4B2' }}>Upload,</span> best your
                  art
                </p>
              }
            />
          </div>
          <div className='col-4'>
            <div className='' style={{ marginLeft: '70px' }}>
              <InputFile
                name='avatar'
                onChange={(e) => handleForm(e)}
                borderRadius='50%'
                width='65%'
                height='140px'
                icon={<AiOutlineCamera size='5em' color='#e7e7e7' />}
              />
            </div>
            <InputForm
              name='greeting'
              value={greeting}
              title='Greeting'
              className='my-3'
              onChange={(e) => handleForm(e)}
            />
            <InputForm
              title='Full Name'
              onChange={(e) => handleForm(e)}
              name='fullname'
              value={fullname}
            />
            <div className='d-flex justify-content-around px-5 mt-5'>
              <Button title='Cancel' className='button-cancel btn-sm px-4' />
              <Button
                title='Post'
                className='button-post btn-sm px-4 text-white'
                style={{ color: '#000' }}
                onClick={(e) => handleUpdate(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
