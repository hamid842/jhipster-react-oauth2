import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAppUser } from 'app/shared/model/app-user.model';
import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './receiver.reducer';
import { IReceiver } from 'app/shared/model/receiver.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReceiverUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReceiverUpdate = (props: IReceiverUpdateProps) => {
  const [appUserId, setAppUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { receiverEntity, appUsers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/receiver' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAppUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdDateTime = convertDateTimeToServer(values.createdDateTime);

    if (errors.length === 0) {
      const entity = {
        ...receiverEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="aquilaApp.receiver.home.createOrEditLabel">Create or edit a Receiver</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : receiverEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="receiver-id">ID</Label>
                  <AvInput id="receiver-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="receiver-firstName">
                  First Name
                </Label>
                <AvField
                  id="receiver-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    maxLength: { value: 40, errorMessage: 'This field cannot be longer than 40 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="middleNameLabel" for="receiver-middleName">
                  Middle Name
                </Label>
                <AvField
                  id="receiver-middleName"
                  type="text"
                  name="middleName"
                  validate={{
                    maxLength: { value: 40, errorMessage: 'This field cannot be longer than 40 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="receiver-lastName">
                  Last Name
                </Label>
                <AvField
                  id="receiver-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    maxLength: { value: 40, errorMessage: 'This field cannot be longer than 40 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastName2Label" for="receiver-lastName2">
                  Last Name 2
                </Label>
                <AvField
                  id="receiver-lastName2"
                  type="text"
                  name="lastName2"
                  validate={{
                    maxLength: { value: 40, errorMessage: 'This field cannot be longer than 40 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="receiver-address">
                  Address
                </Label>
                <AvField
                  id="receiver-address"
                  type="text"
                  name="address"
                  validate={{
                    maxLength: { value: 80, errorMessage: 'This field cannot be longer than 80 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="address2Label" for="receiver-address2">
                  Address 2
                </Label>
                <AvField
                  id="receiver-address2"
                  type="text"
                  name="address2"
                  validate={{
                    maxLength: { value: 80, errorMessage: 'This field cannot be longer than 80 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="address3Label" for="receiver-address3">
                  Address 3
                </Label>
                <AvField
                  id="receiver-address3"
                  type="text"
                  name="address3"
                  validate={{
                    maxLength: { value: 80, errorMessage: 'This field cannot be longer than 80 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="direction1Label" for="receiver-direction1">
                  Direction 1
                </Label>
                <AvField
                  id="receiver-direction1"
                  type="text"
                  name="direction1"
                  validate={{
                    maxLength: { value: 40, errorMessage: 'This field cannot be longer than 40 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="direction2Label" for="receiver-direction2">
                  Direction 2
                </Label>
                <AvField
                  id="receiver-direction2"
                  type="text"
                  name="direction2"
                  validate={{
                    maxLength: { value: 40, errorMessage: 'This field cannot be longer than 40 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="direction3Label" for="receiver-direction3">
                  Direction 3
                </Label>
                <AvField
                  id="receiver-direction3"
                  type="text"
                  name="direction3"
                  validate={{
                    maxLength: { value: 40, errorMessage: 'This field cannot be longer than 40 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="receiver-city">
                  City
                </Label>
                <AvField
                  id="receiver-city"
                  type="text"
                  name="city"
                  validate={{
                    maxLength: { value: 40, errorMessage: 'This field cannot be longer than 40 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="receiver-state">
                  State
                </Label>
                <AvField
                  id="receiver-state"
                  type="text"
                  name="state"
                  validate={{
                    maxLength: { value: 2, errorMessage: 'This field cannot be longer than 2 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="zipCodeLabel" for="receiver-zipCode">
                  Zip Code
                </Label>
                <AvField
                  id="receiver-zipCode"
                  type="text"
                  name="zipCode"
                  validate={{
                    maxLength: { value: 14, errorMessage: 'This field cannot be longer than 14 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="receiver-country">
                  Country
                </Label>
                <AvField
                  id="receiver-country"
                  type="text"
                  name="country"
                  validate={{
                    maxLength: { value: 3, errorMessage: 'This field cannot be longer than 3 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="receiver-phone">
                  Phone
                </Label>
                <AvField
                  id="receiver-phone"
                  type="text"
                  name="phone"
                  validate={{
                    maxLength: { value: 14, errorMessage: 'This field cannot be longer than 14 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneCountryCodeLabel" for="receiver-phoneCountryCode">
                  Phone Country Code
                </Label>
                <AvField
                  id="receiver-phoneCountryCode"
                  type="text"
                  name="phoneCountryCode"
                  validate={{
                    maxLength: { value: 3, errorMessage: 'This field cannot be longer than 3 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="receiver-email">
                  Email
                </Label>
                <AvField
                  id="receiver-email"
                  type="text"
                  name="email"
                  validate={{
                    maxLength: { value: 128, errorMessage: 'This field cannot be longer than 128 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="birthDateLabel" for="receiver-birthDate">
                  Birth Date
                </Label>
                <AvField id="receiver-birthDate" type="text" name="birthDate" />
              </AvGroup>
              <AvGroup>
                <Label id="occupationLabel" for="receiver-occupation">
                  Occupation
                </Label>
                <AvField id="receiver-occupation" type="text" name="occupation" />
              </AvGroup>
              <AvGroup>
                <Label id="countryOfBirthLabel" for="receiver-countryOfBirth">
                  Country Of Birth
                </Label>
                <AvField id="receiver-countryOfBirth" type="text" name="countryOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="receiver-gender">
                  Gender
                </Label>
                <AvInput
                  id="receiver-gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && receiverEntity.gender) || 'Male'}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="receiver-postalCode">
                  Postal Code
                </Label>
                <AvField id="receiver-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="addressCityLabel" for="receiver-addressCity">
                  Address City
                </Label>
                <AvField id="receiver-addressCity" type="text" name="addressCity" />
              </AvGroup>
              <AvGroup>
                <Label id="addressCountryCodeLabel" for="receiver-addressCountryCode">
                  Address Country Code
                </Label>
                <AvField id="receiver-addressCountryCode" type="text" name="addressCountryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="idTypeLabel" for="receiver-idType">
                  Id Type
                </Label>
                <AvField id="receiver-idType" type="text" name="idType" />
              </AvGroup>
              <AvGroup>
                <Label id="idNumberLabel" for="receiver-idNumber">
                  Id Number
                </Label>
                <AvField id="receiver-idNumber" type="text" name="idNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="idCountryCodeLabel" for="receiver-idCountryCode">
                  Id Country Code
                </Label>
                <AvField id="receiver-idCountryCode" type="text" name="idCountryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="idDeliveryDateLabel" for="receiver-idDeliveryDate">
                  Id Delivery Date
                </Label>
                <AvField id="receiver-idDeliveryDate" type="text" name="idDeliveryDate" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateTimeLabel" for="receiver-createdDateTime">
                  Created Date Time
                </Label>
                <AvInput
                  id="receiver-createdDateTime"
                  type="datetime-local"
                  className="form-control"
                  name="createdDateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.receiverEntity.createdDateTime)}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="isDeletedLabel">
                  <AvInput id="receiver-isDeleted" type="checkbox" className="form-check-input" name="isDeleted" />
                  Is Deleted
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="receiver-appUser">App User</Label>
                <AvInput id="receiver-appUser" type="select" className="form-control" name="appUserId">
                  <option value="" key="0" />
                  {appUsers
                    ? appUsers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/receiver" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  appUsers: storeState.appUser.entities,
  receiverEntity: storeState.receiver.entity,
  loading: storeState.receiver.loading,
  updating: storeState.receiver.updating,
  updateSuccess: storeState.receiver.updateSuccess,
});

const mapDispatchToProps = {
  getAppUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverUpdate);
