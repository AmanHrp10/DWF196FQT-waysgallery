import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className='d-flex justify-content-center' style={{ marginTop: '15%' }}>
      <ReactLoading color={'#2FC4B2'} type={'bars'} height={567} width={125} />
    </div>
  );
};

export default Loading;
