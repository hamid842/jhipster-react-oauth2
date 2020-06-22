import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './user-otp.reducer';
import { IUserOtp } from 'app/shared/model/user-otp.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserOtpUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserOtpUpdate = (props: IUserOtpUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { userOtpEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-otp' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...userOtpEntity,
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
          <h2 id="aquilaApp.userOtp.home.createOrEditLabel">Create or edit a UserOtp</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userOtpEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-otp-id">ID</Label>
                  <AvInput id="user-otp-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="msisdnLabel" for="user-otp-msisdn">
                  Msisdn
                </Label>
                <AvField
                  id="user-otp-msisdn"
                  type="text"
                  name="msisdn"
                  validate={{
                    maxLength: { value: 30, errorMessage: 'This field cannot be longer than 30 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tacCodeLabel" for="user-otp-tacCode">
                  Tac Code
                </Label>
                <AvField
                  id="user-otp-tacCode"
                  type="text"
                  name="tacCode"
                  validate={{
                    maxLength: { value: 6, errorMessage: 'This field cannot be longer than 6 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tacExpiryTimeLabel" for="user-otp-tacExpiryTime">
                  Tac Expiry Time
                </Label>
                <AvField id="user-otp-tacExpiryTime" type="text" name="tacExpiryTime" />
              </AvGroup>
              <AvGroup check>
                <Label id="isTacVerifiedLabel">
                  <AvInput id="user-otp-isTacVerified" type="checkbox" className="form-check-input" name="isTacVerified" />
                  Is Tac Verified
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="setPasswordLabel">
                  <AvInput id="user-otp-setPassword" type="checkbox" className="form-check-input" name="setPassword" />
                  Set Password
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="resetPasswordLabel" for="user-otp-resetPassword">
                  Reset Password
                </Label>
                <AvField id="user-otp-resetPassword" type="text" name="resetPassword" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-otp" replace color="info">
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
  userOtpEntity: storeState.userOtp.entity,
  loading: storeState.userOtp.loading,
  updating: storeState.userOtp.updating,
  updateSuccess: storeState.userOtp.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserOtpUpdate);
