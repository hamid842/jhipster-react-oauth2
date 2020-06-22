import './profile-tab.scss';
import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const profileTab = () => {
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
              <Form.Label className="text-custom">Date of birth</Form.Label>
              <Form.Control type="text" placeholder="Date of birth" name="birthDate" className="input"></Form.Control>
              <Row>
                <Col>
                  <Form.Check type="checkbox" label="MALE" name="male" inline />
                </Col>
                <Col>
                  <Form.Check type="checkbox" label="FEMALE" name="female" inline />
                </Col>
              </Row>
              <Form.Label className="text-custom">Email</Form.Label>
              <Form.Control type="email" placeholder="Email" name="email" className="input"></Form.Control>

              <Form.Label></Form.Label>
              <Form.Control as="select" name="accupation" className="input">
                <option>Occupation</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>

              <Form.Label className="text-custom">Employer</Form.Label>
              <Form.Control type="text" placeholder="Employer" name="employer" className="input"></Form.Control>
            </Form.Group>
          </Form>
        </Col>
        {/* Col 2 */}
        <Col className="mt-5">
          <Form>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control as="select" name="nationality" className="input">
                <option>Nationality</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <Form.Label></Form.Label>
              <Form.Control as="select" name="idType" className="input">
                <option>ID Type</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <Form.Label></Form.Label>
              <Form.Control as="select" name="issuingCountry" className="input">
                <option>Issuing Country</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <Form.Label className="text-custom">Expire date</Form.Label>
              <Form.Control type="text" placeholder="Expire date" name="expireDate" className="input"></Form.Control>
              <Form.Label className="text-custom">ID Number</Form.Label>
              <Form.Control type="text" placeholder="ID Number" name="idNumber" className="input"></Form.Control>
            </Form.Group>
          </Form>
        </Col>

        {/* Col 3 */}
        <Col className="mt-5">
          <Form>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control as="select" name="countryOfResident" className="input">
                <option>Country of resident</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <Form.Label className="text-custom">Postal code</Form.Label>
              <Form.Control type="text" placeholder="Postal code" name="postalCode" className="input"></Form.Control>
              <Form.Label className="text-custom">Address</Form.Label>
              <Form.Control type="text" placeholder="Address" name="address" className="input"></Form.Control>
              <Form.Label className="text-custom">Street</Form.Label>
              <Form.Control type="text" placeholder="Street" name="street" className="input"></Form.Control>
              <Form.Label className="text-custom">City</Form.Label>
              <Form.Control type="text" placeholder="City" name="city" className="input"></Form.Control>
              <Form.Label className="text-custom">State</Form.Label>
              <Form.Control type="text" placeholder="State" name="state" className="input"></Form.Control>
            </Form.Group>
          </Form>

          <button className="registerBtn">Register</button>
        </Col>
      </Row>
    </Container>
  );
};

export default profileTab;
