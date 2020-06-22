import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './app-user.reducer';
import { IAppUser } from 'app/shared/model/app-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAppUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AppUserDetail = (props: IAppUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { appUserEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          AppUser [<b>{appUserEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="membershipNo">Membership No</span>
          </dt>
          <dd>{appUserEntity.membershipNo}</dd>
          <dt>
            <span id="firstName">First Name</span>
          </dt>
          <dd>{appUserEntity.firstName}</dd>
          <dt>
            <span id="middleName">Middle Name</span>
          </dt>
          <dd>{appUserEntity.middleName}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{appUserEntity.lastName}</dd>
          <dt>
            <span id="gender">Gender</span>
          </dt>
          <dd>{appUserEntity.gender}</dd>
          <dt>
            <span id="birthDate">Birth Date</span>
          </dt>
          <dd>{appUserEntity.birthDate}</dd>
          <dt>
            <span id="countryOfBirth">Country Of Birth</span>
          </dt>
          <dd>{appUserEntity.countryOfBirth}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{appUserEntity.address}</dd>
          <dt>
            <span id="postalCode">Postal Code</span>
          </dt>
          <dd>{appUserEntity.postalCode}</dd>
          <dt>
            <span id="addressCity">Address City</span>
          </dt>
          <dd>{appUserEntity.addressCity}</dd>
          <dt>
            <span id="addressCountryCode">Address Country Code</span>
          </dt>
          <dd>{appUserEntity.addressCountryCode}</dd>
          <dt>
            <span id="idType">Id Type</span>
          </dt>
          <dd>{appUserEntity.idType}</dd>
          <dt>
            <span id="idDeliveryDate">Id Delivery Date</span>
          </dt>
          <dd>{appUserEntity.idDeliveryDate}</dd>
          <dt>
            <span id="idNumber">Id Number</span>
          </dt>
          <dd>{appUserEntity.idNumber}</dd>
          <dt>
            <span id="idCountryCode">Id Country Code</span>
          </dt>
          <dd>{appUserEntity.idCountryCode}</dd>
          <dt>
            <span id="idExpiryDate">Id Expiry Date</span>
          </dt>
          <dd>
            {appUserEntity.idExpiryDate ? <TextFormat value={appUserEntity.idExpiryDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="idIssueDate">Id Issue Date</span>
          </dt>
          <dd>
            {appUserEntity.idIssueDate ? <TextFormat value={appUserEntity.idIssueDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="userName">User Name</span>
          </dt>
          <dd>{appUserEntity.userName}</dd>
          <dt>
            <span id="employer">Employer</span>
          </dt>
          <dd>{appUserEntity.employer}</dd>
          <dt>
            <span id="userTermAndConditionAccepted">User Term And Condition Accepted</span>
          </dt>
          <dd>{appUserEntity.userTermAndConditionAccepted ? 'true' : 'false'}</dd>
          <dt>
            <span id="userIsActive">User Is Active</span>
          </dt>
          <dd>{appUserEntity.userIsActive ? 'true' : 'false'}</dd>
          <dt>
            <span id="userFlag">User Flag</span>
          </dt>
          <dd>{appUserEntity.userFlag}</dd>
          <dt>
            <span id="kycStatus">Kyc Status</span>
          </dt>
          <dd>{appUserEntity.kycStatus}</dd>
          <dt>
            <span id="userStatus">User Status</span>
          </dt>
          <dd>{appUserEntity.userStatus}</dd>
          <dt>
            <span id="occupation">Occupation</span>
          </dt>
          <dd>{appUserEntity.occupation}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{appUserEntity.email}</dd>
          <dt>
            <span id="photoIdType">Photo Id Type</span>
          </dt>
          <dd>{appUserEntity.photoIdType}</dd>
          <dt>
            <span id="photoIdNumber">Photo Id Number</span>
          </dt>
          <dd>{appUserEntity.photoIdNumber}</dd>
          <dt>
            <span id="photoIdState">Photo Id State</span>
          </dt>
          <dd>{appUserEntity.photoIdState}</dd>
          <dt>
            <span id="photoIdCountry">Photo Id Country</span>
          </dt>
          <dd>{appUserEntity.photoIdCountry}</dd>
          <dt>
            <span id="legalIdType">Legal Id Type</span>
          </dt>
          <dd>{appUserEntity.legalIdType}</dd>
          <dt>
            <span id="legalIdNumber">Legal Id Number</span>
          </dt>
          <dd>{appUserEntity.legalIdNumber}</dd>
          <dt>
            <span id="legalIdIssueCountry">Legal Id Issue Country</span>
          </dt>
          <dd>{appUserEntity.legalIdIssueCountry}</dd>
          <dt>
            <span id="dateOfBirth">Date Of Birth</span>
          </dt>
          <dd>{appUserEntity.dateOfBirth}</dd>
          <dt>
            <span id="birthCity">Birth City</span>
          </dt>
          <dd>{appUserEntity.birthCity}</dd>
          <dt>
            <span id="nationalityCountryCode">Nationality Country Code</span>
          </dt>
          <dd>{appUserEntity.nationalityCountryCode}</dd>
          <dt>
            <span id="mobilePhone">Mobile Phone</span>
          </dt>
          <dd>{appUserEntity.mobilePhone}</dd>
          <dt>
            <span id="mobilePhoneCountryCode">Mobile Phone Country Code</span>
          </dt>
          <dd>{appUserEntity.mobilePhoneCountryCode}</dd>
          <dt>
            <span id="createdDateTime">Created Date Time</span>
          </dt>
          <dd>
            {appUserEntity.createdDateTime ? (
              <TextFormat value={appUserEntity.createdDateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedDateTime">Modified Date Time</span>
          </dt>
          <dd>
            {appUserEntity.modifiedDateTime ? (
              <TextFormat value={appUserEntity.modifiedDateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="isDeleted">Is Deleted</span>
          </dt>
          <dd>{appUserEntity.isDeleted ? 'true' : 'false'}</dd>
          <dt>
            <span id="referenceCode">Reference Code</span>
          </dt>
          <dd>{appUserEntity.referenceCode}</dd>
          <dt>
            <span id="referralCode">Referral Code</span>
          </dt>
          <dd>{appUserEntity.referralCode}</dd>
          <dt>Otp Status</dt>
          <dd>{appUserEntity.otpStatusId ? appUserEntity.otpStatusId : ''}</dd>
        </dl>
        <Button tag={Link} to="/app-user" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/app-user/${appUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ appUser }: IRootState) => ({
  appUserEntity: appUser.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppUserDetail);
