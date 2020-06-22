import './setPassword.scss';
import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

const setPassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const location = useLocation();

  const handleConfirm = () => {
    if ('mobile' in location.state) {
      const { mobile } = location.state;
      const url = 'https://gateway.m1payall.com/aquila/api/users/password';
      axios
        .post(url, { mobile, password })
        .then(() => {
          history.push('/user-login');
        })
        .catch(error => {
          const message = error.response.data.detail.replace('400 BAD_REQUEST', '').replace(/"/g, '');
          toast.error(message);
        });
    }
  };

  return (
    <Container fluid className="set-pass">
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
            <div className="images">
              <img src="content/images/Layer 13.png" alt="Logo" className="mt-2 phoneImg" />
              <img src="content/images/Layer 14.png" alt="Logo" className="lockImg" />
            </div>

            <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <br />
            <Row>
              <Col>
                <input type="checkbox" className="mt-4 check" id="check" />
              </Col>
              <Col>
                <label className="check-label" htmlFor="check">
                  I&nbsp;have&nbsp;read&nbsp;and&nbsp;accept
                </label>
              </Col>
            </Row>

            <Link to="" className="termBtn">
              Privacy, terms & conditions
            </Link>
            <Row className="justify-content-center">
              <Button className="confirmBtn mt-4" onClick={handleConfirm}>
                Confirm
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={{ span: 6, offset: 5 }}>
          <Row>
            <Link to="/user-login" className="mb-2 ml-3 text-capitalize font-weight-normal text-white text-center register">
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

export default withRouter(setPassword);
