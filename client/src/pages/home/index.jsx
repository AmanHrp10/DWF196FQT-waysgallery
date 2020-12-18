import { Fragment, useContext } from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import InputForm from '../../components/atoms/inputForm/index';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import TodayPosts from '../../components/molecules/home/index';
import Order from '../../components/molecules/order';
import Offer from '../../components/molecules/offer';
import './home.css';
import Navbar from '../../components/molecules/navbar';
import { AppContext } from '../../context/AppContext';

export default function Home() {
  const [dropDown, setDropDown] = useState("Today's");
  const handleTodays = () => {
    setDropDown("Today's");
  };
  const handleOrders = () => {
    setDropDown('My Orders');
  };
  const handleOffers = () => {
    setDropDown('My Offers');
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
                <Dropdown.Item href='' onClick={handleTodays}>
                  Today's
                </Dropdown.Item>
                <Dropdown.Item href='' onClick={handleOrders}>
                  My Orders
                </Dropdown.Item>
                <Dropdown.Item href='' onClick={handleOffers}>
                  My Offers
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {dropDown === "Today's" ? (
            <div className='col-3 text-right'>
              <InputForm title={`Search`} />
            </div>
          ) : null}
        </div>
        <div className='row mt-4'>
          {dropDown === "Today's" ? (
            <TodayPosts />
          ) : dropDown === 'My Orders' ? (
            <Order />
          ) : (
            <Offer />
          )}
        </div>
      </div>
    </Fragment>
  );
}
