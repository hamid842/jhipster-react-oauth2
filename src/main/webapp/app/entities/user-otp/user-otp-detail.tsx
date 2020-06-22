import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-otp.reducer';
import { IUserOtp } from 'app/shared/model/user-otp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserOtpDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserOtpDetail = (props: IUserOtpDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userOtpEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          UserOtp [<b>{userOtpEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="msisdn">Msisdn</span>
          </dt>
          <dd>{userOtpEntity.msisdn}</dd>
          <dt>
            <span id="tacCode">Tac Code</span>
          </dt>
          <dd>{userOtpEntity.tacCode}</dd>
          <dt>
            <span id="tacExpiryTime">Tac Expiry Time</span>
          </dt>
          <dd>{userOtpEntity.tacExpiryTime}</dd>
          <dt>
            <span id="isTacVerified">Is Tac Verified</span>
          </dt>
          <dd>{userOtpEntity.isTacVerified ? 'true' : 'false'}</dd>
          <dt>
            <span id="setPassword">Set Password</span>
          </dt>
          <dd>{userOtpEntity.setPassword ? 'true' : 'false'}</dd>
          <dt>
            <span id="resetPassword">Reset Password</span>
          </dt>
          <dd>{userOtpEntity.resetPassword}</dd>
        </dl>
        <Button tag={Link} to="/user-otp" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-otp/${userOtpEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userOtp }: IRootState) => ({
  userOtpEntity: userOtp.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserOtpDetail);
