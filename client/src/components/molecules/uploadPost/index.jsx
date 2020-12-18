import { Fragment, useContext, useState } from 'react';
import './uploadPost.css';
import InputForm from '../../atoms/inputForm/index';
import Textarea from '../../atoms/textArea';
import Button from '../../atoms/button';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import './uploadPost.css';
import { AppContext } from '../../../context/AppContext';
import InputFile from '../../atoms/inputFile/index';
import { API } from '../../../config/api';

export default function UploadPost() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;

  const [fileData, setFileData] = useState({
    images: [],
  });

  const handleFile = (e) => {
    setFileData({
      images: [...fileData.images, e.target.files[0]],
    });
  };

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('title', title);
    body.append('description', description);

    fileData.images.map((image) => {
      body.append('photos', image);
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await API.post('/post', body, config);

      if (response.data.status == 'Request failed') {
        response.data.error.message.map((err) => alert(err));
      }
      setFormData({
        title: '',
        description: '',
      });
    } catch (err) {
      console.log(err);
      alert('Failed');
    }
  };

  return (
    <Fragment>
      <div className='container' style={{ marginTop: '110px' }}>
        <div className='row wrapper-upload-post mt-5'>
          <div className='col-8'>
            <InputFile
              onChange={(e) => handleFile(e)}
              name='image'
              width='520px'
              height='300px'
              icon={<AiOutlineCloudUpload size='10em' color='#e7e7e7' />}
              title={
                <p>
                  <span style={{ color: '#2FC4B2' }}>Brouse,</span> to choose a
                  file
                </p>
              }
            />
          </div>
          <div className='col-4 mt-4'>
            <InputForm
              title='Title'
              name='title'
              value={title}
              onChange={(e) => handleForm(e)}
            />
            <Textarea
              title='Description'
              rows='5'
              className='my-3'
              name='description'
              value={description}
              onChange={(e) => handleForm(e)}
            />
            <div className='d-flex justify-content-around px-5 mt-5'>
              <Button title='Cancel' className='button-cancel btn-sm px-4' />
              <Button
                title='Post'
                className='button-post btn-sm px-4 text-white'
                style={{ color: '#000' }}
                onClick={(e) => handleSubmit(e)}
              />
            </div>
          </div>
        </div>
        <div className='row wrapper-upload-post mt-3'>
          <div className='col-8'>
            <div className='upload-post-child'>
              <div className='row'>
                <div className='col-3'>
                  <InputFile
                    onChange={(e) => handleFile(e)}
                    name='image'
                    width='100%'
                    height='90px'
                    icon={<FiPlus size='5em' color='#e7e7e7' />}
                  />
                </div>
                <div className='col-3'>
                  <InputFile
                    onChange={(e) => handleFile(e)}
                    name='image'
                    width='100%'
                    height='90px'
                    icon={<FiPlus size='5em' color='#e7e7e7' />}
                  />
                </div>
                <div className='col-3'>
                  <InputFile
                    onChange={(e) => handleFile(e)}
                    name='image'
                    width='100%'
                    height='90px'
                    icon={<FiPlus size='5em' color='#e7e7e7' />}
                  />
                </div>
                <div className='col-3'>
                  <InputFile
                    onChange={(e) => handleFile(e)}
                    name='image'
                    width='100%'
                    height='90px'
                    icon={<FiPlus size='5em' color='#e7e7e7' />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
