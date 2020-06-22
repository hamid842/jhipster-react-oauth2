import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserOtp } from 'app/shared/model/user-otp.model';
import { getEntities as getUserOtps } from 'app/entities/user-otp/user-otp.reducer';
import { getEntity, updateEntity, createEntity, reset } from './app-user.reducer';
import { IAppUser } from 'app/shared/model/app-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAppUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AppUserUpdate = (props: IAppUserUpdateProps) => {
  const [otpStatusId, setOtpStatusId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { appUserEntity, userOtps, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/app-user' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUserOtps();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.idExpiryDate = convertDateTimeToServer(values.idExpiryDate);
    values.idIssueDate = convertDateTimeToServer(values.idIssueDate);
    values.createdDateTime = convertDateTimeToServer(values.createdDateTime);
    values.modifiedDateTime = convertDateTimeToServer(values.modifiedDateTime);

    if (errors.length === 0) {
      const entity = {
        ...appUserEntity,
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
          <h2 id="aquilaApp.appUser.home.createOrEditLabel">Create or edit a AppUser</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : appUserEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="app-user-id">ID</Label>
                  <AvInput id="app-user-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="membershipNoLabel" for="app-user-membershipNo">
                  Membership No
                </Label>
                <AvField
                  id="app-user-membershipNo"
                  type="text"
                  name="membershipNo"
                  validate={{
                    maxLength: { value: 16, errorMessage: 'This field cannot be longer than 16 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="app-user-firstName">
                  First Name
                </Label>
                <AvField
                  id="app-user-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    maxLength: { value: 35, errorMessage: 'This field cannot be longer than 35 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="middleNameLabel" for="app-user-middleName">
                  Middle Name
                </Label>
                <AvField
                  id="app-user-middleName"
                  type="text"
                  name="middleName"
                  validate={{
                    maxLength: { value: 35, errorMessage: 'This field cannot be longer than 35 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="app-user-lastName">
                  Last Name
                </Label>
                <AvField
                  id="app-user-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    maxLength: { value: 45, errorMessage: 'This field cannot be longer than 45 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="app-user-gender">
                  Gender
                </Label>
                <AvInput
                  id="app-user-gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && appUserEntity.gender) || 'Male'}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="birthDateLabel" for="app-user-birthDate">
                  Birth Date
                </Label>
                <AvField id="app-user-birthDate" type="text" name="birthDate" />
              </AvGroup>
              <AvGroup>
                <Label id="countryOfBirthLabel" for="app-user-countryOfBirth">
                  Country Of Birth
                </Label>
                <AvField id="app-user-countryOfBirth" type="text" name="countryOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="app-user-address">
                  Address
                </Label>
                <AvField id="app-user-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="app-user-postalCode">
                  Postal Code
                </Label>
                <AvField id="app-user-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="addressCityLabel" for="app-user-addressCity">
                  Address City
                </Label>
                <AvField id="app-user-addressCity" type="text" name="addressCity" />
              </AvGroup>
              <AvGroup>
                <Label id="addressCountryCodeLabel" for="app-user-addressCountryCode">
                  Address Country Code
                </Label>
                <AvField id="app-user-addressCountryCode" type="text" name="addressCountryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="idTypeLabel" for="app-user-idType">
                  Id Type
                </Label>
                <AvField id="app-user-idType" type="text" name="idType" />
              </AvGroup>
              <AvGroup>
                <Label id="idDeliveryDateLabel" for="app-user-idDeliveryDate">
                  Id Delivery Date
                </Label>
                <AvField id="app-user-idDeliveryDate" type="text" name="idDeliveryDate" />
              </AvGroup>
              <AvGroup>
                <Label id="idNumberLabel" for="app-user-idNumber">
                  Id Number
                </Label>
                <AvField
                  id="app-user-idNumber"
                  type="text"
                  name="idNumber"
                  validate={{
                    maxLength: { value: 30, errorMessage: 'This field cannot be longer than 30 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="idCountryCodeLabel" for="app-user-idCountryCode">
                  Id Country Code
                </Label>
                <AvField
                  id="app-user-idCountryCode"
                  type="text"
                  name="idCountryCode"
                  validate={{
                    maxLength: { value: 30, errorMessage: 'This field cannot be longer than 30 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="idExpiryDateLabel" for="app-user-idExpiryDate">
                  Id Expiry Date
                </Label>
                <AvInput
                  id="app-user-idExpiryDate"
                  type="datetime-local"
                  className="form-control"
                  name="idExpiryDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.appUserEntity.idExpiryDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="idIssueDateLabel" for="app-user-idIssueDate">
                  Id Issue Date
                </Label>
                <AvInput
                  id="app-user-idIssueDate"
                  type="datetime-local"
                  className="form-control"
                  name="idIssueDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.appUserEntity.idIssueDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="userNameLabel" for="app-user-userName">
                  User Name
                </Label>
                <AvField
                  id="app-user-userName"
                  type="text"
                  name="userName"
                  validate={{
                    maxLength: { value: 60, errorMessage: 'This field cannot be longer than 60 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="employerLabel" for="app-user-employer">
                  Employer
                </Label>
                <AvField
                  id="app-user-employer"
                  type="text"
                  name="employer"
                  validate={{
                    maxLength: { value: 50, errorMessage: 'This field cannot be longer than 50 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="userTermAndConditionAcceptedLabel">
                  <AvInput
                    id="app-user-userTermAndConditionAccepted"
                    type="checkbox"
                    className="form-check-input"
                    name="userTermAndConditionAccepted"
                  />
                  User Term And Condition Accepted
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="userIsActiveLabel">
                  <AvInput id="app-user-userIsActive" type="checkbox" className="form-check-input" name="userIsActive" />
                  User Is Active
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="userFlagLabel" for="app-user-userFlag">
                  User Flag
                </Label>
                <AvField
                  id="app-user-userFlag"
                  type="text"
                  name="userFlag"
                  validate={{
                    maxLength: { value: 30, errorMessage: 'This field cannot be longer than 30 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="kycStatusLabel" for="app-user-kycStatus">
                  Kyc Status
                </Label>
                <AvInput
                  id="app-user-kycStatus"
                  type="select"
                  className="form-control"
                  name="kycStatus"
                  value={(!isNew && appUserEntity.kycStatus) || 'Approved'}
                >
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                  <option value="PreRegister">PreRegister</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="userStatusLabel" for="app-user-userStatus">
                  User Status
                </Label>
                <AvInput
                  id="app-user-userStatus"
                  type="select"
                  className="form-control"
                  name="userStatus"
                  value={(!isNew && appUserEntity.userStatus) || 'Suspend'}
                >
                  <option value="Suspend">Suspend</option>
                  <option value="Active">Active</option>
                  <option value="Deleted">Deleted</option>
                  <option value="Blacklisted">Blacklisted</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="occupationLabel" for="app-user-occupation">
                  Occupation
                </Label>
                <AvField
                  id="app-user-occupation"
                  type="text"
                  name="occupation"
                  validate={{
                    maxLength: { value: 30, errorMessage: 'This field cannot be longer than 30 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="app-user-email">
                  Email
                </Label>
                <AvField
                  id="app-user-email"
                  type="text"
                  name="email"
                  validate={{
                    maxLength: { value: 128, errorMessage: 'This field cannot be longer than 128 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="photoIdTypeLabel" for="app-user-photoIdType">
                  Photo Id Type
                </Label>
                <AvField id="app-user-photoIdType" type="text" name="photoIdType" />
              </AvGroup>
              <AvGroup>
                <Label id="photoIdNumberLabel" for="app-user-photoIdNumber">
                  Photo Id Number
                </Label>
                <AvField
                  id="app-user-photoIdNumber"
                  type="text"
                  name="photoIdNumber"
                  validate={{
                    maxLength: { value: 20, errorMessage: 'This field cannot be longer than 20 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="photoIdStateLabel" for="app-user-photoIdState">
                  Photo Id State
                </Label>
                <AvField
                  id="app-user-photoIdState"
                  type="text"
                  name="photoIdState"
                  validate={{
                    maxLength: { value: 2, errorMessage: 'This field cannot be longer than 2 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="photoIdCountryLabel" for="app-user-photoIdCountry">
                  Photo Id Country
                </Label>
                <AvField
                  id="app-user-photoIdCountry"
                  type="text"
                  name="photoIdCountry"
                  validate={{
                    maxLength: { value: 3, errorMessage: 'This field cannot be longer than 3 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="legalIdTypeLabel" for="app-user-legalIdType">
                  Legal Id Type
                </Label>
                <AvField id="app-user-legalIdType" type="text" name="legalIdType" />
              </AvGroup>
              <AvGroup>
                <Label id="legalIdNumberLabel" for="app-user-legalIdNumber">
                  Legal Id Number
                </Label>
                <AvField
                  id="app-user-legalIdNumber"
                  type="text"
                  name="legalIdNumber"
                  validate={{
                    maxLength: { value: 20, errorMessage: 'This field cannot be longer than 20 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="legalIdIssueCountryLabel" for="app-user-legalIdIssueCountry">
                  Legal Id Issue Country
                </Label>
                <AvField
                  id="app-user-legalIdIssueCountry"
                  type="text"
                  name="legalIdIssueCountry"
                  validate={{
                    maxLength: { value: 3, errorMessage: 'This field cannot be longer than 3 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="app-user-dateOfBirth">
                  Date Of Birth
                </Label>
                <AvField id="app-user-dateOfBirth" type="text" name="dateOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="birthCityLabel" for="app-user-birthCity">
                  Birth City
                </Label>
                <AvField
                  id="app-user-birthCity"
                  type="text"
                  name="birthCity"
                  validate={{
                    maxLength: { value: 40, errorMessage: 'This field cannot be longer than 40 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nationalityCountryCodeLabel" for="app-user-nationalityCountryCode">
                  Nationality Country Code
                </Label>
                <AvField
                  id="app-user-nationalityCountryCode"
                  type="text"
                  name="nationalityCountryCode"
                  validate={{
                    maxLength: { value: 3, errorMessage: 'This field cannot be longer than 3 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="mobilePhoneLabel" for="app-user-mobilePhone">
                  Mobile Phone
                </Label>
                <AvField
                  id="app-user-mobilePhone"
                  type="text"
                  name="mobilePhone"
                  validate={{
                    maxLength: { value: 14, errorMessage: 'This field cannot be longer than 14 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="mobilePhoneCountryCodeLabel" for="app-user-mobilePhoneCountryCode">
                  Mobile Phone Country Code
                </Label>
                <AvField
                  id="app-user-mobilePhoneCountryCode"
                  type="text"
                  name="mobilePhoneCountryCode"
                  validate={{
                    maxLength: { value: 3, errorMessage: 'This field cannot be longer than 3 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateTimeLabel" for="app-user-createdDateTime">
                  Created Date Time
                </Label>
                <AvInput
                  id="app-user-createdDateTime"
                  type="datetime-local"
                  className="form-control"
                  name="createdDateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.appUserEntity.createdDateTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedDateTimeLabel" for="app-user-modifiedDateTime">
                  Modified Date Time
                </Label>
                <AvInput
                  id="app-user-modifiedDateTime"
                  type="datetime-local"
                  className="form-control"
                  name="modifiedDateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.appUserEntity.modifiedDateTime)}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="isDeletedLabel">
                  <AvInput id="app-user-isDeleted" type="checkbox" className="form-check-input" name="isDeleted" />
                  Is Deleted
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="referenceCodeLabel" for="app-user-referenceCode">
                  Reference Code
                </Label>
                <AvField
                  id="app-user-referenceCode"
                  type="text"
                  name="referenceCode"
                  validate={{
                    maxLength: { value: 16, errorMessage: 'This field cannot be longer than 16 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="referralCodeLabel" for="app-user-referralCode">
                  Referral Code
                </Label>
                <AvField
                  id="app-user-referralCode"
                  type="text"
                  name="referralCode"
                  validate={{
                    maxLength: { value: 16, errorMessage: 'This field cannot be longer than 16 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="app-user-otpStatus">Otp Status</Label>
                <AvInput id="app-user-otpStatus" type="select" className="form-control" name="otpStatusId">
                  <option value="" key="0" />
                  {userOtps
                    ? userOtps.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/app-user" replace color="info">
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
  userOtps: storeState.userOtp.entities,
  appUserEntity: storeState.appUser.entity,
  loading: storeState.appUser.loading,
  updating: storeState.appUser.updating,
  updateSuccess: storeState.appUser.updateSuccess,
});

const mapDispatchToProps = {
  getUserOtps,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppUserUpdate);
