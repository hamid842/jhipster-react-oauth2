import './otpVerification.scss';
import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

const otpVerification = () => {
  const history = useHistory();
  const [otp, setOtp] = useState('');
  const location = useLocation();

  const handleConfirm = () => {
    if ('mobile' in location.state) {
      const { mobile } = location.state;
      const url = 'https://gateway.m1payall.com/aquila/api/users/check-otp';
      axios
        .post(url, { mobile, otp })
        .then(() => {
          history.push({
            pathname: '/set-password',
            state: { mobile },
          });
        })
        .catch(error => {
          const message = error.response.data.detail.replace('400 BAD_REQUEST', '').replace(/"/g, '');
          toast.error(message);
        });
    }
  };

  return (
    <Container fluid className="otp">
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
            <img src="content/images/Layer 13.png" alt="Logo" className="mt-2" />
            <input type="text" name="otp" placeholder="OTP" onChange={e => setOtp(e.target.value)} />
            <Row className="justify-content-center">
              <Button className="confirmBtn mt-5 mr-4" onClick={handleConfirm}>
                Verify
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={{ span: 6, offset: 5 }}>
          <Row className="">
            <Link to="/user-login" className="mb-2 ml-4 font-weight-normal text-capitalize text-white text-center register">
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

export default withRouter(otpVerification);
