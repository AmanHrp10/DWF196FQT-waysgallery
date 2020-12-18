import { Fragment } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import InputForm from '../../atoms/inputForm/index';
import Button from '../../atoms/button/index';
import { AiOutlineCamera } from 'react-icons/ai';
import InputFile from '../../atoms/inputFile/index';
import './editProfile.css';

export default function EditProfile() {
  return (
    <Fragment>
      <div className='container' style={{ marginTop: '110px' }}>
        <div className='row wrapper-upload-post mt-5'>
          <div className='col-8'>
            <InputFile
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
                borderRadius='50%'
                width='65%'
                height='140px'
                icon={<AiOutlineCamera size='5em' color='#e7e7e7' />}
              />
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
