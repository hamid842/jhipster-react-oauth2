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
import { IReceiver } from 'app/shared/model/receiver.model';
import { getEntities as getReceivers } from 'app/entities/receiver/receiver.reducer';
import { getEntity, updateEntity, createEntity, reset } from './thunes-request.reducer';
import { IThunesRequest } from 'app/shared/model/thunes-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IThunesRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThunesRequestUpdate = (props: IThunesRequestUpdateProps) => {
  const [appUserId, setAppUserId] = useState('0');
  const [receiverId, setReceiverId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { thunesRequestEntity, appUsers, receivers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/thunes-request' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAppUsers();
    props.getReceivers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.quotationCreationDate = convertDateTimeToServer(values.quotationCreationDate);
    values.quotationExpirationDate = convertDateTimeToServer(values.quotationExpirationDate);
    values.transactionCreationDate = convertDateTimeToServer(values.transactionCreationDate);
    values.transactionExpirationDate = convertDateTimeToServer(values.transactionExpirationDate);
    values.modifiedDate = convertDateTimeToServer(values.modifiedDate);
    values.createdDate = convertDateTimeToServer(values.createdDate);

    if (errors.length === 0) {
      const entity = {
        ...thunesRequestEntity,
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
          <h2 id="aquilaApp.thunesRequest.home.createOrEditLabel">Create or edit a ThunesRequest</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : thunesRequestEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="thunes-request-id">ID</Label>
                  <AvInput id="thunes-request-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="referenceNumberLabel" for="thunes-request-referenceNumber">
                  Reference Number
                </Label>
                <AvField
                  id="thunes-request-referenceNumber"
                  type="string"
                  className="form-control"
                  name="referenceNumber"
                  validate={{
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sourceAmountLabel" for="thunes-request-sourceAmount">
                  Source Amount
                </Label>
                <AvField
                  id="thunes-request-sourceAmount"
                  type="text"
                  name="sourceAmount"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sourceCurrencyLabel" for="thunes-request-sourceCurrency">
                  Source Currency
                </Label>
                <AvField
                  id="thunes-request-sourceCurrency"
                  type="text"
                  name="sourceCurrency"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="destinationAmountLabel" for="thunes-request-destinationAmount">
                  Destination Amount
                </Label>
                <AvField id="thunes-request-destinationAmount" type="text" name="destinationAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="destinationCurrencyLabel" for="thunes-request-destinationCurrency">
                  Destination Currency
                </Label>
                <AvField
                  id="thunes-request-destinationCurrency"
                  type="text"
                  name="destinationCurrency"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="countryCodeLabel" for="thunes-request-countryCode">
                  Country Code
                </Label>
                <AvField id="thunes-request-countryCode" type="text" name="countryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionStatusLabel" for="thunes-request-transactionStatus">
                  Transaction Status
                </Label>
                <AvInput
                  id="thunes-request-transactionStatus"
                  type="select"
                  className="form-control"
                  name="transactionStatus"
                  value={(!isNew && thunesRequestEntity.transactionStatus) || 'REQUEST'}
                >
                  <option value="REQUEST">REQUEST</option>
                  <option value="QUOTATION">QUOTATION</option>
                  <option value="CREATED">CREATED</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CONFIRMED_UNDER_REVIEW_SLS">CONFIRMED_UNDER_REVIEW_SLS</option>
                  <option value="CONFIRMED_WAITING_FOR_PICKUP">CONFIRMED_WAITING_FOR_PICKUP</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="REJECTED_SLS_SENDER">REJECTED_SLS_SENDER</option>
                  <option value="REJECTED_SLS_BENEFICIARY">REJECTED_SLS_BENEFICIARY</option>
                  <option value="REJECTED_INVALID_BENEFICIARY">REJECTED_INVALID_BENEFICIARY</option>
                  <option value="REJECTED_BARRED_BENEFICIARY">REJECTED_BARRED_BENEFICIARY</option>
                  <option value="REJECTED_INVALID_BENEFICIARY_DETAILS">REJECTED_INVALID_BENEFICIARY_DETAILS</option>
                  <option value="REJECTED_LIMITATIONS_ON_TRANSACTION_VALUE">REJECTED_LIMITATIONS_ON_TRANSACTION_VALUE</option>
                  <option value="REJECTED_LIMITATIONS_ON_SENDER_VALUE">REJECTED_LIMITATIONS_ON_SENDER_VALUE</option>
                  <option value="REJECTED_LIMITATIONS_ON_BENEFICIARY_VALUE">REJECTED_LIMITATIONS_ON_BENEFICIARY_VALUE</option>
                  <option value="REJECTED_LIMITATIONS_ON_ACCOUNT_VALUE">REJECTED_LIMITATIONS_ON_ACCOUNT_VALUE</option>
                  <option value="REJECTED_LIMITATIONS_ON_SENDER_QUANTITY">REJECTED_LIMITATIONS_ON_SENDER_QUANTITY</option>
                  <option value="REJECTED_LIMITATIONS_ON_BENEFICIARY_QUANTITY">REJECTED_LIMITATIONS_ON_BENEFICIARY_QUANTITY</option>
                  <option value="REJECTED_LIMITATIONS_ON_ACCOUNT_QUANTITY">REJECTED_LIMITATIONS_ON_ACCOUNT_QUANTITY</option>
                  <option value="REJECTED_PAYER_CURRENTLY_UNAVAILABLE">REJECTED_PAYER_CURRENTLY_UNAVAILABLE</option>
                  <option value="REJECTED_INSUFFICIENT_BALANCE">REJECTED_INSUFFICIENT_BALANCE</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="REVERSED">REVERSED</option>
                  <option value="DECLINED">DECLINED</option>
                  <option value="DECLINED_SLS_SENDER">DECLINED_SLS_SENDER</option>
                  <option value="DECLINED_SLS_BENEFICIARY">DECLINED_SLS_BENEFICIARY</option>
                  <option value="DECLINED_INVALID_BENEFICIARY">DECLINED_INVALID_BENEFICIARY</option>
                  <option value="DECLINED_BARRED_BENEFICIARY">DECLINED_BARRED_BENEFICIARY</option>
                  <option value="DECLINED_UNSUPPORTED_BENEFICIARY">DECLINED_UNSUPPORTED_BENEFICIARY</option>
                  <option value="DECLINED_INVALID_BENEFICIARY_DETAILS">DECLINED_INVALID_BENEFICIARY_DETAILS</option>
                  <option value="DECLINED_LIMITATIONS_ON_TRANSACTION_VALUE">DECLINED_LIMITATIONS_ON_TRANSACTION_VALUE</option>
                  <option value="DECLINED_LIMITATIONS_ON_SENDER_VALUE">DECLINED_LIMITATIONS_ON_SENDER_VALUE</option>
                  <option value="DECLINED_LIMITATIONS_ON_BENEFICIARY_VALUE">DECLINED_LIMITATIONS_ON_BENEFICIARY_VALUE</option>
                  <option value="DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE">DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE</option>
                  <option value="DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE_DAILY">DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE_DAILY</option>
                  <option value="DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE_WEEKLY">DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE_WEEKLY</option>
                  <option value="DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE_MONTHLY">DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE_MONTHLY</option>
                  <option value="DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE_YEARLY">DECLINED_LIMITATIONS_ON_ACCOUNT_VALUE_YEARLY</option>
                  <option value="DECLINED_LIMITATIONS_ON_SENDER_QUANTITY">DECLINED_LIMITATIONS_ON_SENDER_QUANTITY</option>
                  <option value="DECLINED_LIMITATIONS_ON_BENEFICIARY_QUANTITY">DECLINED_LIMITATIONS_ON_BENEFICIARY_QUANTITY</option>
                  <option value="DECLINED_LIMITATIONS_ON_ACCOUNT_QUANTITY">DECLINED_LIMITATIONS_ON_ACCOUNT_QUANTITY</option>
                  <option value="DECLINED_PAYER_CURRENTLY_UNAVAILABLE">DECLINED_PAYER_CURRENTLY_UNAVAILABLE</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="transactionTypeLabel" for="thunes-request-transactionType">
                  Transaction Type
                </Label>
                <AvInput
                  id="thunes-request-transactionType"
                  type="select"
                  className="form-control"
                  name="transactionType"
                  value={(!isNew && thunesRequestEntity.transactionType) || 'C2C'}
                >
                  <option value="C2C">C2C</option>
                  <option value="C2B">C2B</option>
                  <option value="B2C">B2C</option>
                  <option value="B2B">B2B</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="transactionDateLabel" for="thunes-request-transactionDate">
                  Transaction Date
                </Label>
                <AvField id="thunes-request-transactionDate" type="date" className="form-control" name="transactionDate" />
              </AvGroup>
              <AvGroup>
                <Label id="feeAmountLabel" for="thunes-request-feeAmount">
                  Fee Amount
                </Label>
                <AvField id="thunes-request-feeAmount" type="text" name="feeAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="feeCurrencyLabel" for="thunes-request-feeCurrency">
                  Fee Currency
                </Label>
                <AvField id="thunes-request-feeCurrency" type="text" name="feeCurrency" />
              </AvGroup>
              <AvGroup>
                <Label id="quotationIdLabel" for="thunes-request-quotationId">
                  Quotation Id
                </Label>
                <AvField id="thunes-request-quotationId" type="text" name="quotationId" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionIdLabel" for="thunes-request-transactionId">
                  Transaction Id
                </Label>
                <AvField id="thunes-request-transactionId" type="text" name="transactionId" />
              </AvGroup>
              <AvGroup>
                <Label id="quotationCreationDateLabel" for="thunes-request-quotationCreationDate">
                  Quotation Creation Date
                </Label>
                <AvInput
                  id="thunes-request-quotationCreationDate"
                  type="datetime-local"
                  className="form-control"
                  name="quotationCreationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.thunesRequestEntity.quotationCreationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="quotationExpirationDateLabel" for="thunes-request-quotationExpirationDate">
                  Quotation Expiration Date
                </Label>
                <AvInput
                  id="thunes-request-quotationExpirationDate"
                  type="datetime-local"
                  className="form-control"
                  name="quotationExpirationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.thunesRequestEntity.quotationExpirationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="senderFirstNameLabel" for="thunes-request-senderFirstName">
                  Sender First Name
                </Label>
                <AvField id="thunes-request-senderFirstName" type="text" name="senderFirstName" />
              </AvGroup>
              <AvGroup>
                <Label id="senderLastNameLabel" for="thunes-request-senderLastName">
                  Sender Last Name
                </Label>
                <AvField id="thunes-request-senderLastName" type="text" name="senderLastName" />
              </AvGroup>
              <AvGroup>
                <Label id="senderNationalityCountryCodeLabel" for="thunes-request-senderNationalityCountryCode">
                  Sender Nationality Country Code
                </Label>
                <AvField id="thunes-request-senderNationalityCountryCode" type="text" name="senderNationalityCountryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="senderBirthDateLabel" for="thunes-request-senderBirthDate">
                  Sender Birth Date
                </Label>
                <AvField id="thunes-request-senderBirthDate" type="text" name="senderBirthDate" />
              </AvGroup>
              <AvGroup>
                <Label id="senderCountryOfBirthLabel" for="thunes-request-senderCountryOfBirth">
                  Sender Country Of Birth
                </Label>
                <AvField id="thunes-request-senderCountryOfBirth" type="text" name="senderCountryOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="senderGenderLabel" for="thunes-request-senderGender">
                  Sender Gender
                </Label>
                <AvField id="thunes-request-senderGender" type="text" name="senderGender" />
              </AvGroup>
              <AvGroup>
                <Label id="senderAddressLabel" for="thunes-request-senderAddress">
                  Sender Address
                </Label>
                <AvField id="thunes-request-senderAddress" type="text" name="senderAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="senderPostalCodeLabel" for="thunes-request-senderPostalCode">
                  Sender Postal Code
                </Label>
                <AvField id="thunes-request-senderPostalCode" type="text" name="senderPostalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="senderCityLabel" for="thunes-request-senderCity">
                  Sender City
                </Label>
                <AvField id="thunes-request-senderCity" type="text" name="senderCity" />
              </AvGroup>
              <AvGroup>
                <Label id="senderCountryCodeLabel" for="thunes-request-senderCountryCode">
                  Sender Country Code
                </Label>
                <AvField id="thunes-request-senderCountryCode" type="text" name="senderCountryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="senderMsisdnLabel" for="thunes-request-senderMsisdn">
                  Sender Msisdn
                </Label>
                <AvField id="thunes-request-senderMsisdn" type="text" name="senderMsisdn" />
              </AvGroup>
              <AvGroup>
                <Label id="senderEmailLabel" for="thunes-request-senderEmail">
                  Sender Email
                </Label>
                <AvField id="thunes-request-senderEmail" type="text" name="senderEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="senderIdTypeLabel" for="thunes-request-senderIdType">
                  Sender Id Type
                </Label>
                <AvField id="thunes-request-senderIdType" type="text" name="senderIdType" />
              </AvGroup>
              <AvGroup>
                <Label id="senderIdNumberLabel" for="thunes-request-senderIdNumber">
                  Sender Id Number
                </Label>
                <AvField id="thunes-request-senderIdNumber" type="text" name="senderIdNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="senderIdCountryCodeLabel" for="thunes-request-senderIdCountryCode">
                  Sender Id Country Code
                </Label>
                <AvField id="thunes-request-senderIdCountryCode" type="text" name="senderIdCountryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="senderIdDeliveryDateLabel" for="thunes-request-senderIdDeliveryDate">
                  Sender Id Delivery Date
                </Label>
                <AvField id="thunes-request-senderIdDeliveryDate" type="text" name="senderIdDeliveryDate" />
              </AvGroup>
              <AvGroup>
                <Label id="senderOccupationLabel" for="thunes-request-senderOccupation">
                  Sender Occupation
                </Label>
                <AvField id="thunes-request-senderOccupation" type="text" name="senderOccupation" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryFirstNameLabel" for="thunes-request-beneficiaryFirstName">
                  Beneficiary First Name
                </Label>
                <AvField id="thunes-request-beneficiaryFirstName" type="text" name="beneficiaryFirstName" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryLastNameLabel" for="thunes-request-beneficiaryLastName">
                  Beneficiary Last Name
                </Label>
                <AvField id="thunes-request-beneficiaryLastName" type="text" name="beneficiaryLastName" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryNationalityCountryCodeLabel" for="thunes-request-beneficiaryNationalityCountryCode">
                  Beneficiary Nationality Country Code
                </Label>
                <AvField id="thunes-request-beneficiaryNationalityCountryCode" type="text" name="beneficiaryNationalityCountryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryBirthDateLabel" for="thunes-request-beneficiaryBirthDate">
                  Beneficiary Birth Date
                </Label>
                <AvField id="thunes-request-beneficiaryBirthDate" type="text" name="beneficiaryBirthDate" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryCountryOfBirthLabel" for="thunes-request-beneficiaryCountryOfBirth">
                  Beneficiary Country Of Birth
                </Label>
                <AvField id="thunes-request-beneficiaryCountryOfBirth" type="text" name="beneficiaryCountryOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryGenderLabel" for="thunes-request-beneficiaryGender">
                  Beneficiary Gender
                </Label>
                <AvField id="thunes-request-beneficiaryGender" type="text" name="beneficiaryGender" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryAddressLabel" for="thunes-request-beneficiaryAddress">
                  Beneficiary Address
                </Label>
                <AvField id="thunes-request-beneficiaryAddress" type="text" name="beneficiaryAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryPostalCodeLabel" for="thunes-request-beneficiaryPostalCode">
                  Beneficiary Postal Code
                </Label>
                <AvField id="thunes-request-beneficiaryPostalCode" type="text" name="beneficiaryPostalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryCityLabel" for="thunes-request-beneficiaryCity">
                  Beneficiary City
                </Label>
                <AvField id="thunes-request-beneficiaryCity" type="text" name="beneficiaryCity" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryCountryCodeLabel" for="thunes-request-beneficiaryCountryCode">
                  Beneficiary Country Code
                </Label>
                <AvField id="thunes-request-beneficiaryCountryCode" type="text" name="beneficiaryCountryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryMsisdnLabel" for="thunes-request-beneficiaryMsisdn">
                  Beneficiary Msisdn
                </Label>
                <AvField id="thunes-request-beneficiaryMsisdn" type="text" name="beneficiaryMsisdn" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryEmailLabel" for="thunes-request-beneficiaryEmail">
                  Beneficiary Email
                </Label>
                <AvField id="thunes-request-beneficiaryEmail" type="text" name="beneficiaryEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryIdTypeLabel" for="thunes-request-beneficiaryIdType">
                  Beneficiary Id Type
                </Label>
                <AvField id="thunes-request-beneficiaryIdType" type="text" name="beneficiaryIdType" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryIdNumberLabel" for="thunes-request-beneficiaryIdNumber">
                  Beneficiary Id Number
                </Label>
                <AvField id="thunes-request-beneficiaryIdNumber" type="text" name="beneficiaryIdNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryIdCountryCodeLabel" for="thunes-request-beneficiaryIdCountryCode">
                  Beneficiary Id Country Code
                </Label>
                <AvField id="thunes-request-beneficiaryIdCountryCode" type="text" name="beneficiaryIdCountryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryIdDeliveryDateLabel" for="thunes-request-beneficiaryIdDeliveryDate">
                  Beneficiary Id Delivery Date
                </Label>
                <AvField id="thunes-request-beneficiaryIdDeliveryDate" type="text" name="beneficiaryIdDeliveryDate" />
              </AvGroup>
              <AvGroup>
                <Label id="beneficiaryOccupationLabel" for="thunes-request-beneficiaryOccupation">
                  Beneficiary Occupation
                </Label>
                <AvField id="thunes-request-beneficiaryOccupation" type="text" name="beneficiaryOccupation" />
              </AvGroup>
              <AvGroup>
                <Label id="creditPartyMsisdnLabel" for="thunes-request-creditPartyMsisdn">
                  Credit Party Msisdn
                </Label>
                <AvField id="thunes-request-creditPartyMsisdn" type="text" name="creditPartyMsisdn" />
              </AvGroup>
              <AvGroup>
                <Label id="creditPartyAccountNumberLabel" for="thunes-request-creditPartyAccountNumber">
                  Credit Party Account Number
                </Label>
                <AvField id="thunes-request-creditPartyAccountNumber" type="text" name="creditPartyAccountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="creditPartySwiftCodeLabel" for="thunes-request-creditPartySwiftCode">
                  Credit Party Swift Code
                </Label>
                <AvField id="thunes-request-creditPartySwiftCode" type="text" name="creditPartySwiftCode" />
              </AvGroup>
              <AvGroup>
                <Label id="wholesaleFxRateLabel" for="thunes-request-wholesaleFxRate">
                  Wholesale Fx Rate
                </Label>
                <AvField id="thunes-request-wholesaleFxRate" type="text" name="wholesaleFxRate" />
              </AvGroup>
              <AvGroup>
                <Label id="modeLabel" for="thunes-request-mode">
                  Mode
                </Label>
                <AvField id="thunes-request-mode" type="text" name="mode" />
              </AvGroup>
              <AvGroup>
                <Label id="additionalInfo1Label" for="thunes-request-additionalInfo1">
                  Additional Info 1
                </Label>
                <AvField id="thunes-request-additionalInfo1" type="text" name="additionalInfo1" />
              </AvGroup>
              <AvGroup>
                <Label id="additionalInfo2Label" for="thunes-request-additionalInfo2">
                  Additional Info 2
                </Label>
                <AvField id="thunes-request-additionalInfo2" type="text" name="additionalInfo2" />
              </AvGroup>
              <AvGroup>
                <Label id="additionalInfo3Label" for="thunes-request-additionalInfo3">
                  Additional Info 3
                </Label>
                <AvField id="thunes-request-additionalInfo3" type="text" name="additionalInfo3" />
              </AvGroup>
              <AvGroup>
                <Label id="purposeRemittanceLabel" for="thunes-request-purposeRemittance">
                  Purpose Remittance
                </Label>
                <AvInput
                  id="thunes-request-purposeRemittance"
                  type="select"
                  className="form-control"
                  name="purposeRemittance"
                  value={(!isNew && thunesRequestEntity.purposeRemittance) || 'FAMILY_SUPPORT'}
                >
                  <option value="FAMILY_SUPPORT">FAMILY_SUPPORT</option>
                  <option value="EDUCATION">EDUCATION</option>
                  <option value="GIFT_AND_DONATION">GIFT_AND_DONATION</option>
                  <option value="MEDICAL_TREATMENT">MEDICAL_TREATMENT</option>
                  <option value="MAINTENANCE_EXPENSES">MAINTENANCE_EXPENSES</option>
                  <option value="TRAVEL">TRAVEL</option>
                  <option value="SMALL_VALUE_REMITTANCE">SMALL_VALUE_REMITTANCE</option>
                  <option value="LIBERALIZED_REMITTANCE">LIBERALIZED_REMITTANCE</option>
                  <option value="CONSTRUCTION_EXPENSES">CONSTRUCTION_EXPENSES</option>
                  <option value="HOTEL_ACCOMMODATION">HOTEL_ACCOMMODATION</option>
                  <option value="ADVERTISING_EXPENSES">ADVERTISING_EXPENSES</option>
                  <option value="ADVISORY_FEES">ADVISORY_FEES</option>
                  <option value="BUSINESS_INSURANCE">BUSINESS_INSURANCE</option>
                  <option value="INSURANCE_CLAIMS">INSURANCE_CLAIMS</option>
                  <option value="DELIVERY_FEES">DELIVERY_FEES</option>
                  <option value="EXPORTED_GOODS">EXPORTED_GOODS</option>
                  <option value="SERVICE_CHARGES">SERVICE_CHARGES</option>
                  <option value="LOAN_PAYMENT">LOAN_PAYMENT</option>
                  <option value="OFFICE_EXPENSES">OFFICE_EXPENSES</option>
                  <option value="PROPERTY_PURCHASE">PROPERTY_PURCHASE</option>
                  <option value="PROPERTY_RENTAL">PROPERTY_RENTAL</option>
                  <option value="ROYALTY_FEES">ROYALTY_FEES</option>
                  <option value="SHARES_INVESTMENT">SHARES_INVESTMENT</option>
                  <option value="FUND_INVESTMENT">FUND_INVESTMENT</option>
                  <option value="TAX_PAYMENT">TAX_PAYMENT</option>
                  <option value="TRANSPORTATION_FEES">TRANSPORTATION_FEES</option>
                  <option value="UTILITY_BILLS">UTILITY_BILLS</option>
                  <option value="PERSONAL_TRANSFER">PERSONAL_TRANSFER</option>
                  <option value="SALARY_PAYMENT">SALARY_PAYMENT</option>
                  <option value="OTHER_FEES">OTHER_FEES</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="documentReferenceNumberLabel" for="thunes-request-documentReferenceNumber">
                  Document Reference Number
                </Label>
                <AvField id="thunes-request-documentReferenceNumber" type="text" name="documentReferenceNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="callbackUrlLabel" for="thunes-request-callbackUrl">
                  Callback Url
                </Label>
                <AvField id="thunes-request-callbackUrl" type="text" name="callbackUrl" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionCreationDateLabel" for="thunes-request-transactionCreationDate">
                  Transaction Creation Date
                </Label>
                <AvInput
                  id="thunes-request-transactionCreationDate"
                  type="datetime-local"
                  className="form-control"
                  name="transactionCreationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.thunesRequestEntity.transactionCreationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="transactionExpirationDateLabel" for="thunes-request-transactionExpirationDate">
                  Transaction Expiration Date
                </Label>
                <AvInput
                  id="thunes-request-transactionExpirationDate"
                  type="datetime-local"
                  className="form-control"
                  name="transactionExpirationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.thunesRequestEntity.transactionExpirationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedDateLabel" for="thunes-request-modifiedDate">
                  Modified Date
                </Label>
                <AvInput
                  id="thunes-request-modifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="modifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.thunesRequestEntity.modifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="thunes-request-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="thunes-request-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.thunesRequestEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="thunes-request-appUser">App User</Label>
                <AvInput id="thunes-request-appUser" type="select" className="form-control" name="appUserId">
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
              <AvGroup>
                <Label for="thunes-request-receiver">Receiver</Label>
                <AvInput id="thunes-request-receiver" type="select" className="form-control" name="receiverId">
                  <option value="" key="0" />
                  {receivers
                    ? receivers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/thunes-request" replace color="info">
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
  receivers: storeState.receiver.entities,
  thunesRequestEntity: storeState.thunesRequest.entity,
  loading: storeState.thunesRequest.loading,
  updating: storeState.thunesRequest.updating,
  updateSuccess: storeState.thunesRequest.updateSuccess,
});

const mapDispatchToProps = {
  getAppUsers,
  getReceivers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThunesRequestUpdate);
