import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import {
  ICrudSearchAction,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './app-user.reducer';
import { IAppUser } from 'app/shared/model/app-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IAppUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AppUser = (props: IAppUserProps) => {
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    if (search) {
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    } else {
      props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
    }
  };

  const startSearching = () => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    }
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { appUserList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="app-user-heading">
        App Users
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new App User
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput type="text" name="search" value={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {appUserList && appUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('membershipNo')}>
                  Membership No <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstName')}>
                  First Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('middleName')}>
                  Middle Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastName')}>
                  Last Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('gender')}>
                  Gender <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('birthDate')}>
                  Birth Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('countryOfBirth')}>
                  Country Of Birth <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('address')}>
                  Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('postalCode')}>
                  Postal Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('addressCity')}>
                  Address City <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('addressCountryCode')}>
                  Address Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('idType')}>
                  Id Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('idDeliveryDate')}>
                  Id Delivery Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('idNumber')}>
                  Id Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('idCountryCode')}>
                  Id Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('idExpiryDate')}>
                  Id Expiry Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('idIssueDate')}>
                  Id Issue Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userName')}>
                  User Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('employer')}>
                  Employer <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userTermAndConditionAccepted')}>
                  User Term And Condition Accepted <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userIsActive')}>
                  User Is Active <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userFlag')}>
                  User Flag <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('kycStatus')}>
                  Kyc Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userStatus')}>
                  User Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('occupation')}>
                  Occupation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  Email <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('photoIdType')}>
                  Photo Id Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('photoIdNumber')}>
                  Photo Id Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('photoIdState')}>
                  Photo Id State <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('photoIdCountry')}>
                  Photo Id Country <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('legalIdType')}>
                  Legal Id Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('legalIdNumber')}>
                  Legal Id Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('legalIdIssueCountry')}>
                  Legal Id Issue Country <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateOfBirth')}>
                  Date Of Birth <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('birthCity')}>
                  Birth City <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nationalityCountryCode')}>
                  Nationality Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mobilePhone')}>
                  Mobile Phone <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mobilePhoneCountryCode')}>
                  Mobile Phone Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdDateTime')}>
                  Created Date Time <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('modifiedDateTime')}>
                  Modified Date Time <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('isDeleted')}>
                  Is Deleted <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('referenceCode')}>
                  Reference Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('referralCode')}>
                  Referral Code <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Otp Status <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {appUserList.map((appUser, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${appUser.id}`} color="link" size="sm">
                      {appUser.id}
                    </Button>
                  </td>
                  <td>{appUser.membershipNo}</td>
                  <td>{appUser.firstName}</td>
                  <td>{appUser.middleName}</td>
                  <td>{appUser.lastName}</td>
                  <td>{appUser.gender}</td>
                  <td>{appUser.birthDate}</td>
                  <td>{appUser.countryOfBirth}</td>
                  <td>{appUser.address}</td>
                  <td>{appUser.postalCode}</td>
                  <td>{appUser.addressCity}</td>
                  <td>{appUser.addressCountryCode}</td>
                  <td>{appUser.idType}</td>
                  <td>{appUser.idDeliveryDate}</td>
                  <td>{appUser.idNumber}</td>
                  <td>{appUser.idCountryCode}</td>
                  <td>{appUser.idExpiryDate ? <TextFormat type="date" value={appUser.idExpiryDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{appUser.idIssueDate ? <TextFormat type="date" value={appUser.idIssueDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{appUser.userName}</td>
                  <td>{appUser.employer}</td>
                  <td>{appUser.userTermAndConditionAccepted ? 'true' : 'false'}</td>
                  <td>{appUser.userIsActive ? 'true' : 'false'}</td>
                  <td>{appUser.userFlag}</td>
                  <td>{appUser.kycStatus}</td>
                  <td>{appUser.userStatus}</td>
                  <td>{appUser.occupation}</td>
                  <td>{appUser.email}</td>
                  <td>{appUser.photoIdType}</td>
                  <td>{appUser.photoIdNumber}</td>
                  <td>{appUser.photoIdState}</td>
                  <td>{appUser.photoIdCountry}</td>
                  <td>{appUser.legalIdType}</td>
                  <td>{appUser.legalIdNumber}</td>
                  <td>{appUser.legalIdIssueCountry}</td>
                  <td>{appUser.dateOfBirth}</td>
                  <td>{appUser.birthCity}</td>
                  <td>{appUser.nationalityCountryCode}</td>
                  <td>{appUser.mobilePhone}</td>
                  <td>{appUser.mobilePhoneCountryCode}</td>
                  <td>
                    {appUser.createdDateTime ? <TextFormat type="date" value={appUser.createdDateTime} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {appUser.modifiedDateTime ? <TextFormat type="date" value={appUser.modifiedDateTime} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{appUser.isDeleted ? 'true' : 'false'}</td>
                  <td>{appUser.referenceCode}</td>
                  <td>{appUser.referralCode}</td>
                  <td>{appUser.otpStatusId ? <Link to={`user-otp/${appUser.otpStatusId}`}>{appUser.otpStatusId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${appUser.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${appUser.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${appUser.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No App Users found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={appUserList && appUserList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ appUser }: IRootState) => ({
  appUserList: appUser.entities,
  loading: appUser.loading,
  totalItems: appUser.totalItems,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppUser);
