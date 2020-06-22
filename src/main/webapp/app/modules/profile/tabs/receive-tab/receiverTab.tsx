import './receiver-tab.scss';

import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Table from './table';

const receiverTab = () => {
  return (
    <Container>
      <Row>
        {/* Col 1 */}
        <Col className="mt-5">
          <Form>
            <Form.Group>
              <Form.Label className="text-custom">First name</Form.Label>
              <Form.Control type="text" placeholder="First name" name="firstName" className="input"></Form.Control>
              <Form.Label className="text-custom">Middle name</Form.Label>
              <Form.Control type="text" placeholder="Middle name" name="middleName" className="input"></Form.Control>
              <Form.Label className="text-custom">Last name</Form.Label>
              <Form.Control type="text" placeholder="Last name" name="lastName" className="input"></Form.Control>
              <Form.Label className="text-custom">Mobile number</Form.Label>
              <Form.Control type="text" placeholder="Mobile number" name="mobileNumber" className="mb-4 input"></Form.Control>
              <Form.Label className="text-custom"></Form.Label>
              <Form.Control as="select" name="countryOfResident" className="input">
                <option>Country of resident</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        {/* Col 2 */}
        <Col className="mt-5">
          <Form>
            <Form.Group>
              <Form.Label className="text-custom"></Form.Label>
              <Form.Control as="select" className="input" name="relationship">
                <option>Relationship</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>

              <Form.Label className="text-custom"></Form.Label>
              <Form.Control as="select" className="input" name="purposeOfTransaction">
                <option>Purpose of transaction</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <Form.Label className="text-custom">Email</Form.Label>
              <Form.Control type="email" placeholder="Email" name="email" className="input"></Form.Control>
              <Row>
                <Col>
                  <Form.Check type="checkbox" label="MALE" name="male" className="checkbox" inline />
                </Col>
                <Col>
                  <Form.Check type="checkbox" label="FEMALE" name="female" className="checkbox" inline />
                </Col>
              </Row>
              {/* <Form.Label className="text-custom"></Form.Label> */}
              <Form.Control as="select" className="input" name="idType">
                <option>ID Type</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>

              <Form.Label className="text-custom">ID Number</Form.Label>
              <Form.Control type="text" placeholder="ID Number" name="idNumber" className="input"></Form.Control>
            </Form.Group>
          </Form>
        </Col>

        {/* Col 3 */}
        <Col className="mt-5">
          <Form>
            <Form.Group>
              <Form.Label className="text-custom">Postal code</Form.Label>
              <Form.Control type="text" placeholder="Postal code" name="postalCode" className="input"></Form.Control>
              <Form.Label className="text-custom">State</Form.Label>
              <Form.Control type="text" placeholder="State" name="state" className="input"></Form.Control>
              <Form.Label className="text-custom">City</Form.Label>
              <Form.Control type="text" placeholder="City" name="city" className="input"></Form.Control>
              <Form.Label className="text-custom">Address</Form.Label>
              <Form.Control type="text" placeholder="Address" name="address" className="mb-4 input"></Form.Control>
              <Form.Label className="text-custom"></Form.Label>
              <Form.Control as="select" className="input" name="idType">
                <option>Nationality</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Row>
            <Col xs={3}>
              <button className="btn newBtn">New</button>
            </Col>
            <Col xs={2}>
              <button className="btn saveBtn">Save</button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Table />
      </Row>
    </Container>
  );
};

export default receiverTab;
