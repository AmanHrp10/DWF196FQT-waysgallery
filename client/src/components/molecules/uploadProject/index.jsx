import { Fragment, useState } from 'react';
import Textarea from '../../atoms/textArea';
import Button from '../../atoms/button';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import InputFile from '../../atoms/inputFile/index';
import { API } from '../../../config/api';
import { useHistory, useParams } from 'react-router-dom';

export default function UploadProject() {
  const [formData, setFormData] = useState({
    description: '',
  });

  const { description } = formData;

  const [fileData, setFileData] = useState({
    images: [],
  });

  const router = useHistory();
  const { id } = useParams();

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
    body.append('description', description);

    fileData.images.map((image) => {
      return body.append('images', image);
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await API.post(`/project/${id}`, body, config);

      console.log(response);
      if (response.data.status === 'Request failed') {
        alert(response.data.message);
      }
      setFormData({
        title: '',
        description: '',
      });
      alert('Post was added');
      router.push('/transaction');
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
          <div className='col-4'>
            <Textarea
              title='Description'
              rows='5'
              className='my-3'
              name='description'
              value={description}
              onChange={(e) => handleForm(e)}
            />
            <div className='d-flex justify-content-around px-5 mt-5'>
              <Button
                title='Send Project'
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
