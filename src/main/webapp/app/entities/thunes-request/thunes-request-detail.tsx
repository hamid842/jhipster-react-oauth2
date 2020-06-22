import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './thunes-request.reducer';
import { IThunesRequest } from 'app/shared/model/thunes-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThunesRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThunesRequestDetail = (props: IThunesRequestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { thunesRequestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ThunesRequest [<b>{thunesRequestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="referenceNumber">Reference Number</span>
          </dt>
          <dd>{thunesRequestEntity.referenceNumber}</dd>
          <dt>
            <span id="sourceAmount">Source Amount</span>
          </dt>
          <dd>{thunesRequestEntity.sourceAmount}</dd>
          <dt>
            <span id="sourceCurrency">Source Currency</span>
          </dt>
          <dd>{thunesRequestEntity.sourceCurrency}</dd>
          <dt>
            <span id="destinationAmount">Destination Amount</span>
          </dt>
          <dd>{thunesRequestEntity.destinationAmount}</dd>
          <dt>
            <span id="destinationCurrency">Destination Currency</span>
          </dt>
          <dd>{thunesRequestEntity.destinationCurrency}</dd>
          <dt>
            <span id="countryCode">Country Code</span>
          </dt>
          <dd>{thunesRequestEntity.countryCode}</dd>
          <dt>
            <span id="transactionStatus">Transaction Status</span>
          </dt>
          <dd>{thunesRequestEntity.transactionStatus}</dd>
          <dt>
            <span id="transactionType">Transaction Type</span>
          </dt>
          <dd>{thunesRequestEntity.transactionType}</dd>
          <dt>
            <span id="transactionDate">Transaction Date</span>
          </dt>
          <dd>
            {thunesRequestEntity.transactionDate ? (
              <TextFormat value={thunesRequestEntity.transactionDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="feeAmount">Fee Amount</span>
          </dt>
          <dd>{thunesRequestEntity.feeAmount}</dd>
          <dt>
            <span id="feeCurrency">Fee Currency</span>
          </dt>
          <dd>{thunesRequestEntity.feeCurrency}</dd>
          <dt>
            <span id="quotationId">Quotation Id</span>
          </dt>
          <dd>{thunesRequestEntity.quotationId}</dd>
          <dt>
            <span id="transactionId">Transaction Id</span>
          </dt>
          <dd>{thunesRequestEntity.transactionId}</dd>
          <dt>
            <span id="quotationCreationDate">Quotation Creation Date</span>
          </dt>
          <dd>
            {thunesRequestEntity.quotationCreationDate ? (
              <TextFormat value={thunesRequestEntity.quotationCreationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="quotationExpirationDate">Quotation Expiration Date</span>
          </dt>
          <dd>
            {thunesRequestEntity.quotationExpirationDate ? (
              <TextFormat value={thunesRequestEntity.quotationExpirationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="senderFirstName">Sender First Name</span>
          </dt>
          <dd>{thunesRequestEntity.senderFirstName}</dd>
          <dt>
            <span id="senderLastName">Sender Last Name</span>
          </dt>
          <dd>{thunesRequestEntity.senderLastName}</dd>
          <dt>
            <span id="senderNationalityCountryCode">Sender Nationality Country Code</span>
          </dt>
          <dd>{thunesRequestEntity.senderNationalityCountryCode}</dd>
          <dt>
            <span id="senderBirthDate">Sender Birth Date</span>
          </dt>
          <dd>{thunesRequestEntity.senderBirthDate}</dd>
          <dt>
            <span id="senderCountryOfBirth">Sender Country Of Birth</span>
          </dt>
          <dd>{thunesRequestEntity.senderCountryOfBirth}</dd>
          <dt>
            <span id="senderGender">Sender Gender</span>
          </dt>
          <dd>{thunesRequestEntity.senderGender}</dd>
          <dt>
            <span id="senderAddress">Sender Address</span>
          </dt>
          <dd>{thunesRequestEntity.senderAddress}</dd>
          <dt>
            <span id="senderPostalCode">Sender Postal Code</span>
          </dt>
          <dd>{thunesRequestEntity.senderPostalCode}</dd>
          <dt>
            <span id="senderCity">Sender City</span>
          </dt>
          <dd>{thunesRequestEntity.senderCity}</dd>
          <dt>
            <span id="senderCountryCode">Sender Country Code</span>
          </dt>
          <dd>{thunesRequestEntity.senderCountryCode}</dd>
          <dt>
            <span id="senderMsisdn">Sender Msisdn</span>
          </dt>
          <dd>{thunesRequestEntity.senderMsisdn}</dd>
          <dt>
            <span id="senderEmail">Sender Email</span>
          </dt>
          <dd>{thunesRequestEntity.senderEmail}</dd>
          <dt>
            <span id="senderIdType">Sender Id Type</span>
          </dt>
          <dd>{thunesRequestEntity.senderIdType}</dd>
          <dt>
            <span id="senderIdNumber">Sender Id Number</span>
          </dt>
          <dd>{thunesRequestEntity.senderIdNumber}</dd>
          <dt>
            <span id="senderIdCountryCode">Sender Id Country Code</span>
          </dt>
          <dd>{thunesRequestEntity.senderIdCountryCode}</dd>
          <dt>
            <span id="senderIdDeliveryDate">Sender Id Delivery Date</span>
          </dt>
          <dd>{thunesRequestEntity.senderIdDeliveryDate}</dd>
          <dt>
            <span id="senderOccupation">Sender Occupation</span>
          </dt>
          <dd>{thunesRequestEntity.senderOccupation}</dd>
          <dt>
            <span id="beneficiaryFirstName">Beneficiary First Name</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryFirstName}</dd>
          <dt>
            <span id="beneficiaryLastName">Beneficiary Last Name</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryLastName}</dd>
          <dt>
            <span id="beneficiaryNationalityCountryCode">Beneficiary Nationality Country Code</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryNationalityCountryCode}</dd>
          <dt>
            <span id="beneficiaryBirthDate">Beneficiary Birth Date</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryBirthDate}</dd>
          <dt>
            <span id="beneficiaryCountryOfBirth">Beneficiary Country Of Birth</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryCountryOfBirth}</dd>
          <dt>
            <span id="beneficiaryGender">Beneficiary Gender</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryGender}</dd>
          <dt>
            <span id="beneficiaryAddress">Beneficiary Address</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryAddress}</dd>
          <dt>
            <span id="beneficiaryPostalCode">Beneficiary Postal Code</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryPostalCode}</dd>
          <dt>
            <span id="beneficiaryCity">Beneficiary City</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryCity}</dd>
          <dt>
            <span id="beneficiaryCountryCode">Beneficiary Country Code</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryCountryCode}</dd>
          <dt>
            <span id="beneficiaryMsisdn">Beneficiary Msisdn</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryMsisdn}</dd>
          <dt>
            <span id="beneficiaryEmail">Beneficiary Email</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryEmail}</dd>
          <dt>
            <span id="beneficiaryIdType">Beneficiary Id Type</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryIdType}</dd>
          <dt>
            <span id="beneficiaryIdNumber">Beneficiary Id Number</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryIdNumber}</dd>
          <dt>
            <span id="beneficiaryIdCountryCode">Beneficiary Id Country Code</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryIdCountryCode}</dd>
          <dt>
            <span id="beneficiaryIdDeliveryDate">Beneficiary Id Delivery Date</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryIdDeliveryDate}</dd>
          <dt>
            <span id="beneficiaryOccupation">Beneficiary Occupation</span>
          </dt>
          <dd>{thunesRequestEntity.beneficiaryOccupation}</dd>
          <dt>
            <span id="creditPartyMsisdn">Credit Party Msisdn</span>
          </dt>
          <dd>{thunesRequestEntity.creditPartyMsisdn}</dd>
          <dt>
            <span id="creditPartyAccountNumber">Credit Party Account Number</span>
          </dt>
          <dd>{thunesRequestEntity.creditPartyAccountNumber}</dd>
          <dt>
            <span id="creditPartySwiftCode">Credit Party Swift Code</span>
          </dt>
          <dd>{thunesRequestEntity.creditPartySwiftCode}</dd>
          <dt>
            <span id="wholesaleFxRate">Wholesale Fx Rate</span>
          </dt>
          <dd>{thunesRequestEntity.wholesaleFxRate}</dd>
          <dt>
            <span id="mode">Mode</span>
          </dt>
          <dd>{thunesRequestEntity.mode}</dd>
          <dt>
            <span id="additionalInfo1">Additional Info 1</span>
          </dt>
          <dd>{thunesRequestEntity.additionalInfo1}</dd>
          <dt>
            <span id="additionalInfo2">Additional Info 2</span>
          </dt>
          <dd>{thunesRequestEntity.additionalInfo2}</dd>
          <dt>
            <span id="additionalInfo3">Additional Info 3</span>
          </dt>
          <dd>{thunesRequestEntity.additionalInfo3}</dd>
          <dt>
            <span id="purposeRemittance">Purpose Remittance</span>
          </dt>
          <dd>{thunesRequestEntity.purposeRemittance}</dd>
          <dt>
            <span id="documentReferenceNumber">Document Reference Number</span>
          </dt>
          <dd>{thunesRequestEntity.documentReferenceNumber}</dd>
          <dt>
            <span id="callbackUrl">Callback Url</span>
          </dt>
          <dd>{thunesRequestEntity.callbackUrl}</dd>
          <dt>
            <span id="transactionCreationDate">Transaction Creation Date</span>
          </dt>
          <dd>
            {thunesRequestEntity.transactionCreationDate ? (
              <TextFormat value={thunesRequestEntity.transactionCreationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="transactionExpirationDate">Transaction Expiration Date</span>
          </dt>
          <dd>
            {thunesRequestEntity.transactionExpirationDate ? (
              <TextFormat value={thunesRequestEntity.transactionExpirationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedDate">Modified Date</span>
          </dt>
          <dd>
            {thunesRequestEntity.modifiedDate ? (
              <TextFormat value={thunesRequestEntity.modifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {thunesRequestEntity.createdDate ? (
              <TextFormat value={thunesRequestEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>App User</dt>
          <dd>{thunesRequestEntity.appUserId ? thunesRequestEntity.appUserId : ''}</dd>
          <dt>Receiver</dt>
          <dd>{thunesRequestEntity.receiverId ? thunesRequestEntity.receiverId : ''}</dd>
        </dl>
        <Button tag={Link} to="/thunes-request" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/thunes-request/${thunesRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ thunesRequest }: IRootState) => ({
  thunesRequestEntity: thunesRequest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThunesRequestDetail);
