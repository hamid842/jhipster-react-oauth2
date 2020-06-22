import './lgoin.scss';
import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('Please enter your mobile number!');
  return (
    <Container fluid className="login">
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
            <input type="text" name="mobile" placeholder="Mobile Number" onChange={e => setMobile(e.target.value)} />
            <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="mb-5" />
            <div className="err">{mobile === '' ? error : null}</div>
            <Row md={6} lg="2">
              <Col xs={6}>
                <div className="mt-5">
                  <Link to="/forgot-password" className="text-capitalize forgotBtn">
                    Forgot&nbsp;Password?
                  </Link>
                </div>
              </Col>
              <Col xs={6}>
                <div className="logo-field ">
                  <Link to="">
                    <img src="content/images/right-arrow.png" alt="Send" className="arrow" />
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={{ span: 6, offset: 5 }}>
          <Row>
            <Link to="/mobile-register" className="mb-2 ml-3 text-capitalize text-white text-center register">
              Register
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

export default Login;
