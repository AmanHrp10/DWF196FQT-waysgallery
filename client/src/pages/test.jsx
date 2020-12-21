import { Fragment } from 'react';
import InputFile from '../components/atoms/inputFile';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import InputDate from '../components/atoms/inputDate/index';

export default function Test() {
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <Fragment>
      <InputDate
        type='date'
        title='Start Project'
        onChange={(e) => handleChange(e)}
        icon={<AiOutlineCloudUpload />}
      />
    </Fragment>
  );
}
