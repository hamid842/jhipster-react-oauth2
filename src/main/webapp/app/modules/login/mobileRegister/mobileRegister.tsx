import './mobileRegister.scss';
import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

const mobileRegister = () => {
  const history = useHistory();
  const [mobile, setMobile] = useState('');

  const handleConfirm = () => {
    const url = 'https://gateway.m1payall.com/aquila/api/users/register';

    axios
      .post(url, {
        mobile,
      })
      .then(response => {
        response.status === 200
          ? history.push({
              pathname: '/OTP-verification',
              state: { mobile },
            })
          : null;
      })
      .catch(error => {
        const message = error.response.data.detail.replace('400 BAD_REQUEST', '').replace(/"/g, '');
        toast.error(message);
      });
  };

  return (
    <Container fluid className="mobile-register">
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <img src="content/images/Layer 3.png" alt="Main Logo" className="main-logo" />
        </Col>
        <Col xs={6}>
          <h1 className="text-white always">
            Always
            <br />
            <h1 className="open">&nbsp;Open.24/7</h1>
          </h1>
        </Col>
      </Row>
      <h1 className="text-white text-center mt-5 hello">Hello&nbsp;there.</h1>
      <h5 className="text-white text-center mt-4 under-hello">Login or sign up to continue</h5>
      <Container className="input-box mt-4">
        <Row>
          <Col>
            <img src="content/images/Layer 8.png" alt="Logo" className="mt-2" />
            <Row className="mt-3">
              <PhoneInput
                country={'my'}
                value={mobile}
                placeholder="Mobile Number"
                onChange={phone => setMobile('+' + phone)}
                inputProps={{ required: true, autoFocus: true }}
                containerStyle={{ marginBottom: '30px', marginLeft: '10px', boxShadow: 'none' }}
                inputStyle={{ color: '#7371ea' }}
              />
            </Row>
            {/* <input type="text" name="mobile" placeholder="Mobile Number" onChange={e => setMobile(e.target.value)} className="mb-5" /> */}
            <Row className="justify-content-md-center">
              <button className="btn confirmBtn" onClick={handleConfirm}>
                Confirm
              </button>
            </Row>
          </Col>
        </Row>
      </Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={{ span: 6, offset: 5 }}>
          <Row className="ml-1">
            <Link to="/user-login" className="mb-3 text-capitalize text-white text-center register">
              Login
            </Link>
          </Row>
          <img src="content/images/Layer 4.png" alt="Main Logo" className="logo" />
          <br />
          <img src="content/images/Layer 5.png" alt="Main Logo" className="money-gram" />
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(mobileRegister);
