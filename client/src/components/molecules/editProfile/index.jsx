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
import Dropzone from 'react-dropzone';
import Preview from '../../atoms/preview/index';
import { FiPlus } from 'react-icons/fi';

export default function EditProfile() {
  const [state, dispatch] = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);
  const [previews, setPreviews] = useState([]);
  const [artData, setArtData] = useState({
    arts: [],
  });
  const [formData, setFormData] = useState({
    fullname: user.name,
    greeting: user.greeting,
    avatar: '',
  });

  const { avatar, greeting, fullname } = formData;
  const router = useHistory();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('fullname', fullname);
    body.append('greeting', greeting);
    body.append('avatar', avatar);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const response = await API.patch(`/user`, body, config);

      dispatch({
        type: 'EDIT_USER',
        payload: response.data.data.user,
      });
      router.push('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const handleForm = (e) => {
    const updateForm = {
      ...formData,
    };
    updateForm[e.target.name] =
      e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData(updateForm);
  };

  const uploadArt = async (files) => {
    const body = new FormData();

    if (files.length > 5) {
      alert('Max select 5 file');
      return;
    }

    files.map((file) => body.append('arts', file));

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      setLoading(true);
      const response = await API.post('/art', body, config);

      if (response.data.status !== 'Request success') {
        setLoading(false);
      }

      alert('Your Art was uploaded');
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      alert('Please select image only');
      console.log(rejectedFiles);
      console.log(acceptedFiles);
      return;
    }

    if (acceptedFiles.length > 5) {
      alert('Please select max 5 file');

      return;
    }

    if (acceptedFiles.length > 1) {
      if (previews.length === 0) {
        uploadArt(acceptedFiles);

        setPreviews(...previews, acceptedFiles);
      } else {
        const data = [...previews];
        const indexArr = data.length;

        for (let i = 0; i < acceptedFiles.length; i++) {
          data[indexArr + i] = acceptedFiles[i];
        }
        setPreviews(data);
      }
    } else {
      uploadArt(acceptedFiles);
      setPreviews([...previews, acceptedFiles[0]]);
    }
  };

  console.log(previews);

  return (
    <Fragment>
      <div className='container' style={{ marginTop: '110px' }}>
        <form action='' onSubmit={(e) => handleUpdate(e)}>
          <div className='row wrapper-upload-post mt-5'>
            <div className='col-8'>
              <Dropzone
                onDrop={handleDrop}
                maxSize={5 * 1000 * 1000}
                accept='image/*'
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {previews.length > 0 ? (
                        <Preview file={previews[0]} isMainPreview />
                      ) : (
                        <InputFile
                          // onChange={(e) => handleFile(e)}
                          name='image'
                          width='520px'
                          height='300px'
                          icon={
                            <AiOutlineCloudUpload size='10em' color='#e7e7e7' />
                          }
                          title={
                            <p>
                              <span style={{ color: '#2FC4B2' }}>Brouse,</span>{' '}
                              to choose a file
                            </p>
                          }
                        />
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
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
                  type='submit'
                  className='button-post btn-sm px-4 text-white'
                  style={{ color: '#000' }}
                />
              </div>
            </div>
          </div>
          <div className='row wrapper-upload-post mt-3'>
            <div className='col-8'>
              <div className='upload-post-child'>
                <div className='row'>
                  <div className='col-3'>
                    {previews[1] ? (
                      <Preview file={previews[1]} />
                    ) : (
                      <InputFile
                        // onChange={(e) => handleFile(e)}
                        name='image'
                        width='100%'
                        height='90px'
                        icon={<FiPlus size='5em' color='#e7e7e7' />}
                      />
                    )}
                  </div>
                  <div className='col-3'>
                    {previews[2] ? (
                      <Preview file={previews[2]} />
                    ) : (
                      <InputFile
                        // onChange={(e) => handleFile(e)}
                        name='image'
                        width='100%'
                        height='90px'
                        icon={<FiPlus size='5em' color='#e7e7e7' />}
                      />
                    )}
                  </div>
                  <div className='col-3'>
                    {previews[3] ? (
                      <Preview file={previews[3]} />
                    ) : (
                      <InputFile
                        // onChange={(e) => handleFile(e)}
                        name='image'
                        width='100%'
                        height='90px'
                        icon={<FiPlus size='5em' color='#e7e7e7' />}
                      />
                    )}
                  </div>
                  <div className='col-3'>
                    {previews[4] ? (
                      <Preview file={previews[4]} />
                    ) : (
                      <InputFile
                        // onChange={(e) => handleFile(e)}
                        name='image'
                        width='100%'
                        height='90px'
                        icon={<FiPlus size='5em' color='#e7e7e7' />}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
