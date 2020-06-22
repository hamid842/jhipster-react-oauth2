import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './receiver.reducer';
import { IReceiver } from 'app/shared/model/receiver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReceiverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReceiverDetail = (props: IReceiverDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { receiverEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Receiver [<b>{receiverEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">First Name</span>
          </dt>
          <dd>{receiverEntity.firstName}</dd>
          <dt>
            <span id="middleName">Middle Name</span>
          </dt>
          <dd>{receiverEntity.middleName}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{receiverEntity.lastName}</dd>
          <dt>
            <span id="lastName2">Last Name 2</span>
          </dt>
          <dd>{receiverEntity.lastName2}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{receiverEntity.address}</dd>
          <dt>
            <span id="address2">Address 2</span>
          </dt>
          <dd>{receiverEntity.address2}</dd>
          <dt>
            <span id="address3">Address 3</span>
          </dt>
          <dd>{receiverEntity.address3}</dd>
          <dt>
            <span id="direction1">Direction 1</span>
          </dt>
          <dd>{receiverEntity.direction1}</dd>
          <dt>
            <span id="direction2">Direction 2</span>
          </dt>
          <dd>{receiverEntity.direction2}</dd>
          <dt>
            <span id="direction3">Direction 3</span>
          </dt>
          <dd>{receiverEntity.direction3}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{receiverEntity.city}</dd>
          <dt>
            <span id="state">State</span>
          </dt>
          <dd>{receiverEntity.state}</dd>
          <dt>
            <span id="zipCode">Zip Code</span>
          </dt>
          <dd>{receiverEntity.zipCode}</dd>
          <dt>
            <span id="country">Country</span>
          </dt>
          <dd>{receiverEntity.country}</dd>
          <dt>
            <span id="phone">Phone</span>
          </dt>
          <dd>{receiverEntity.phone}</dd>
          <dt>
            <span id="phoneCountryCode">Phone Country Code</span>
          </dt>
          <dd>{receiverEntity.phoneCountryCode}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{receiverEntity.email}</dd>
          <dt>
            <span id="birthDate">Birth Date</span>
          </dt>
          <dd>{receiverEntity.birthDate}</dd>
          <dt>
            <span id="occupation">Occupation</span>
          </dt>
          <dd>{receiverEntity.occupation}</dd>
          <dt>
            <span id="countryOfBirth">Country Of Birth</span>
          </dt>
          <dd>{receiverEntity.countryOfBirth}</dd>
          <dt>
            <span id="gender">Gender</span>
          </dt>
          <dd>{receiverEntity.gender}</dd>
          <dt>
            <span id="postalCode">Postal Code</span>
          </dt>
          <dd>{receiverEntity.postalCode}</dd>
          <dt>
            <span id="addressCity">Address City</span>
          </dt>
          <dd>{receiverEntity.addressCity}</dd>
          <dt>
            <span id="addressCountryCode">Address Country Code</span>
          </dt>
          <dd>{receiverEntity.addressCountryCode}</dd>
          <dt>
            <span id="idType">Id Type</span>
          </dt>
          <dd>{receiverEntity.idType}</dd>
          <dt>
            <span id="idNumber">Id Number</span>
          </dt>
          <dd>{receiverEntity.idNumber}</dd>
          <dt>
            <span id="idCountryCode">Id Country Code</span>
          </dt>
          <dd>{receiverEntity.idCountryCode}</dd>
          <dt>
            <span id="idDeliveryDate">Id Delivery Date</span>
          </dt>
          <dd>{receiverEntity.idDeliveryDate}</dd>
          <dt>
            <span id="createdDateTime">Created Date Time</span>
          </dt>
          <dd>
            {receiverEntity.createdDateTime ? (
              <TextFormat value={receiverEntity.createdDateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="isDeleted">Is Deleted</span>
          </dt>
          <dd>{receiverEntity.isDeleted ? 'true' : 'false'}</dd>
          <dt>App User</dt>
          <dd>{receiverEntity.appUserId ? receiverEntity.appUserId : ''}</dd>
        </dl>
        <Button tag={Link} to="/receiver" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/receiver/${receiverEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ receiver }: IRootState) => ({
  receiverEntity: receiver.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverDetail);
