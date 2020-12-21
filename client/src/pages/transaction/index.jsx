import { Fragment, useContext } from 'react';
import Navbar from '../../components/molecules/navbar';
import Order from '../../components/molecules/order/index';
import { AppContext } from '../../context/AppContext';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import Offer from '../../components/molecules/offer';

export default function Transaction() {
  const [state, dispatch] = useContext(AppContext);
  const { transactionDropdown: dropdown } = state;

  const handleOrderDropdown = async (e) => {
    dispatch({
      type: 'DROPDOWN_ORDERS',
    });
  };
  const handleOfferDropdown = async (e) => {
    dispatch({
      type: 'DROPDOWN_OFFERS',
    });
  };
  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <Dropdown
          as={ButtonGroup}
          style={{ color: '#000', hover: 'none', marginTop: '130px' }}
        >
          <div className='dropdown-transaction'>
            <Button
              style={{
                color: '#000',
                hover: 'none',
              }}
            >
              {dropdown}
            </Button>
            <Dropdown.Toggle
              id='dropdown-split-basic'
              style={{ color: '#000', hover: 'none' }}
            />
          </div>
          <Dropdown.Menu>
            <Dropdown.Item href='' onClick={(e) => handleOrderDropdown(e)}>
              My Orders
            </Dropdown.Item>
            <Dropdown.Item href='' onClick={(e) => handleOfferDropdown(e)}>
              My Offers
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {dropdown === 'My Orders' ? <Order /> : <Offer />}
    </Fragment>
  );
}
