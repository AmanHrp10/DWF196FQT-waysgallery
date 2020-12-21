import { Fragment, useContext } from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import InputForm from '../../components/atoms/inputForm/index';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import TodayPosts from '../../components/molecules/todaysPost/index';
import './home.css';
import Navbar from '../../components/molecules/navbar';
import { AppContext } from '../../context/AppContext';

export default function Home() {
  const [state] = useContext(AppContext);

  const { user } = state;

  console.log(user);
  const [dropDown, setDropDown] = useState('All');
  const handleAll = () => {
    setDropDown('All');
  };
  const handleTodays = () => {
    setDropDown("Today's");
  };
  return (
    <Fragment>
      <Navbar />
      <div className='container' style={{ marginTop: '110px' }}>
        <div className='row justify-content-between'>
          <div className='col-3'>
            <Dropdown as={ButtonGroup}>
              <div className='dropdown-home'>
                <Button
                  style={{
                    color: '#000',
                    hover: 'none',
                  }}
                >
                  {dropDown}
                </Button>
                <Dropdown.Toggle
                  split
                  id='dropdown-split-basic'
                  style={{ color: '#000', hover: 'none' }}
                />
              </div>

              <Dropdown.Menu>
                <Dropdown.Item href='' onClick={handleAll}>
                  All
                </Dropdown.Item>
                <Dropdown.Item href='' onClick={handleTodays}>
                  Today's
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className='col-3 text-right'>
            <InputForm title={`Search`} />
          </div>
        </div>
        <div className='row mt-4'>
          <TodayPosts />
        </div>
      </div>
    </Fragment>
  );
}
