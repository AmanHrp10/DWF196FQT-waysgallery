import { Fragment } from 'react';
import InputFile from '../components/atoms/inputFile';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export default function Test() {
  return (
    <Fragment>
      <InputFile
        width='500px'
        height='300px'
        icon={<AiOutlineCloudUpload size='10em' color='#e7e7e7' />}
        title={
          <p>
            <span style={{ color: '#2FC4B2' }}>Brouse,</span> to choose a file
          </p>
        }
      />
    </Fragment>
  );
}
