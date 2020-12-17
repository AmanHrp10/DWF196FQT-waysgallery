import { Fragment } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import InputForm from '../../atoms/inputForm/index';
import Textarea from '../../atoms/textAre';
import Button from '../../atoms/button/index';
import { AiOutlineCamera } from 'react-icons/ai';
import './editProfile.css';

export default function EditProfile() {
  return (
    <Fragment>
      <div className='container'>
        <div className='row wrapper-upload-post mt-5'>
          <div className='col-8'>
            <div className='upload-post'>
              <div className='d-flex justify-content-center align-content-center mt-4 flex-row'>
                <AiOutlineCloudUpload size='10em' color='#e7e7e7' />
                <div style={{ position: 'absolute', top: '60%' }}>
                  <span style={{ color: ' #2FC4B2', fontWeight: 'bold' }}>
                    Upload
                  </span>{' '}
                  Best Your Art
                </div>
              </div>
            </div>
          </div>
          <div className='col-4 mt-4'>
            <div className='image-profile'>
              <div className='d-flex justify-content-center pt-4'>
                <AiOutlineCamera size='5em' color='#e7e7e7' />
              </div>
            </div>
            <InputForm title='Greeting' className='my-3' />
            <InputForm title='Full Name' />
            <div className='d-flex justify-content-around px-5 mt-5'>
              <Button title='Cancel' className='button-cancel btn-sm px-4' />
              <Button
                title='Post'
                className='button-post btn-sm px-4 text-white'
                style={{ color: '#000' }}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
