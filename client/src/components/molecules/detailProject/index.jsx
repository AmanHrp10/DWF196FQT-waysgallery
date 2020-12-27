import { Fragment, useEffect, useState } from 'react';
import Button from '../../atoms/button';
import { useParams, useHistory } from 'react-router-dom';
import { API } from '../../../config/api';
import fileDownload from 'js-file-download';

export default function DetailProject() {
  const [hire, setHire] = useState('');
  const [project, setProject] = useState('');
  const [loading, setLoading] = useState(true);
  const [indexImage, setIndexImage] = useState(0);
  const { id } = useParams();
  const router = useHistory();

  const fetchHire = async () => {
    try {
      setLoading(true);
      const response = await API(`/transaction/order/${id}`);
      setHire(response.data.data.order);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptProject = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.put(`/confirm-hire/${id}`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  };
  const rejectProject = async (e) => {
    e.preventDefault();
    try {
      await API.delete(`/hire/${id}`);
      router.push('/transaction');
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  };
  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await API(`/project/${id}`);
      setProject(response.data.data.project);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const download = async () => {
    try {
      const response = await API(`/download/${id}`, { responseType: 'blob' });
      const data = response;
      console.log(data);
      // fileDownload(data, 'file.zip');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeImage = (e) => {
    setIndexImage(e.target.id);
  };

  useEffect(() => {
    fetchProject();
    fetchHire();
  }, []);

  console.log(hire);
  return loading ? (
    <h1>Loading</h1>
  ) : (
    <Fragment>
      <div
        className='container'
        style={{ marginTop: '120px', marginBottom: '100px' }}
      >
        <div className='row'>
          <div className='col-8'>
            <div className='image-project' style={{ height: '400px' }}>
              <img
                src={
                  !project.images
                    ? null
                    : `http://localhost:8000/uploads/${project.images[indexImage].image}`
                }
                width='100%'
                height='100%'
                alt=''
              />
            </div>
            <div
              className='sub-image d-flex mt-3'
              style={{ width: '150px', cursor: 'pointer' }}
            >
              {project.images &&
                project.images.map((image, index) => {
                  return (
                    <img
                      key={index}
                      id={index}
                      src={`http://localhost:8000/uploads/${image.image}`}
                      alt=''
                      width='100%'
                      onClick={(e) => handleChangeImage(e)}
                      style={{ paddingRight: '20px' }}
                    />
                  );
                })}
            </div>
          </div>
          <div className='col-4'>
            <div className='container'>
              <div className='description'>{project.description}</div>
              <div className='button-action mt-4'>
                {hire.status && hire.status === 'Complete' ? (
                  <>
                    <Button
                      title='Accept'
                      onClick={acceptProject}
                      className='button-post text-white btn-sm'
                    />
                    <Button
                      title='Cancel'
                      className='btn-sm ml-4'
                      style={{ background: 'red', color: '#fff  ' }}
                      onClick={rejectProject}
                    />
                  </>
                ) : loading ? null : (
                  <Button
                    title='Download'
                    onClick={download}
                    className='button-post text-white btn-sm'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
