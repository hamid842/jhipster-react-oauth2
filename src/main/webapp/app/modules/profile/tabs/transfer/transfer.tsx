import './transfer.scss';
import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const transfer = () => {
  return (
    <Container className="transfer">
      <Row>
        {/* Col 1 */}
        <Col>
          <Form>
            <Form.Group>
              <Form.Label className="text-custom labels">Send Amount</Form.Label>
              <Row>
                <Col xs={6}>
                  <Form.Control type="text" name="sendAmount" className="mb-3 send-input"></Form.Control>
                </Col>
                <Col xs={6}>
                  <button className="btn">MYR</button>
                </Col>
              </Row>
              <Form.Label className="text-custom">Destination Country</Form.Label>
              <Form.Control type="text" name="destCountry" className="dest-input"></Form.Control>
              <Form.Label className="text-custom">Payment Method</Form.Label>
              <Row className="mt-4 ml-1">
                <span>
                  <Form.Check type="radio"></Form.Check>
                </span>
                <span>
                  <img src="content/images/Layer 20.png" alt="" className="ml-2" />
                </span>
                <span>
                  <Form.Check.Label className="ml-3 text-custom">Debit/Credit</Form.Check.Label>
                </span>
              </Row>
              <Row className="mt-4 ml-1">
                <span>
                  <Form.Check type="radio"></Form.Check>
                </span>
                <span>
                  <img src="content/images/Layer 21.png" alt="" className="ml-2" />
                </span>
                <span>
                  <Form.Check.Label className="ml-3 text-custom">FPX</Form.Check.Label>
                </span>
              </Row>
              <Row className="mt-4 ml-1">
                <span>
                  <Form.Check type="radio"></Form.Check>
                </span>
                <span>
                  <img src="content/images/Layer 22.png" alt="" className="ml-2" />
                </span>
                <span>
                  <Form.Check.Label className="ml-3 text-custom">Ewallet</Form.Check.Label>
                </span>
              </Row>
            </Form.Group>
          </Form>
        </Col>

        {/* Col 2 */}
        <Col>
          <Form>
            <Form.Group>
              <Form.Label className="text-custom labels">Receive Amount</Form.Label>
              <Row>
                <Col xs={6}>
                  <Form.Control type="text" name="receiveAmount" className="mb-3 receive-input"></Form.Control>
                </Col>
                <Col xs={6}>
                  <button className="btn">NGN</button>
                </Col>
              </Row>
              <Form.Label className="text-custom">Free Amount</Form.Label>
              <Form.Control type="text" name="freeAmount" className="free-amount"></Form.Control>
              <Form.Label className="text-custom">Receive Method</Form.Label>
              <Row className="mt-4 ml-1">
                <span>
                  <Form.Check type="radio"></Form.Check>
                </span>
                <span>
                  <Form.Check.Label className="ml-3 text-custom">Cash Pickup</Form.Check.Label>
                </span>
              </Row>
              <Row className="mt-4 ml-1">
                <span>
                  <Form.Check type="radio"></Form.Check>
                </span>

                <span>
                  <Form.Check.Label className="ml-3 text-custom">Account Deposit</Form.Check.Label>
                </span>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <button className="btn nextBtn">Next</button>
    </Container>
  );
};

export default transfer;
