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
import { getSearchEntities, getEntities } from './receiver.reducer';
import { IReceiver } from 'app/shared/model/receiver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IReceiverProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Receiver = (props: IReceiverProps) => {
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

  const { receiverList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="receiver-heading">
        Receivers
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Receiver
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
        {receiverList && receiverList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
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
                <th className="hand" onClick={sort('lastName2')}>
                  Last Name 2 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('address')}>
                  Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('address2')}>
                  Address 2 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('address3')}>
                  Address 3 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('direction1')}>
                  Direction 1 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('direction2')}>
                  Direction 2 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('direction3')}>
                  Direction 3 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('city')}>
                  City <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('state')}>
                  State <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('zipCode')}>
                  Zip Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('country')}>
                  Country <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  Phone <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phoneCountryCode')}>
                  Phone Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  Email <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('birthDate')}>
                  Birth Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('occupation')}>
                  Occupation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('countryOfBirth')}>
                  Country Of Birth <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('gender')}>
                  Gender <FontAwesomeIcon icon="sort" />
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
                <th className="hand" onClick={sort('idNumber')}>
                  Id Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('idCountryCode')}>
                  Id Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('idDeliveryDate')}>
                  Id Delivery Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdDateTime')}>
                  Created Date Time <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('isDeleted')}>
                  Is Deleted <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  App User <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {receiverList.map((receiver, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${receiver.id}`} color="link" size="sm">
                      {receiver.id}
                    </Button>
                  </td>
                  <td>{receiver.firstName}</td>
                  <td>{receiver.middleName}</td>
                  <td>{receiver.lastName}</td>
                  <td>{receiver.lastName2}</td>
                  <td>{receiver.address}</td>
                  <td>{receiver.address2}</td>
                  <td>{receiver.address3}</td>
                  <td>{receiver.direction1}</td>
                  <td>{receiver.direction2}</td>
                  <td>{receiver.direction3}</td>
                  <td>{receiver.city}</td>
                  <td>{receiver.state}</td>
                  <td>{receiver.zipCode}</td>
                  <td>{receiver.country}</td>
                  <td>{receiver.phone}</td>
                  <td>{receiver.phoneCountryCode}</td>
                  <td>{receiver.email}</td>
                  <td>{receiver.birthDate}</td>
                  <td>{receiver.occupation}</td>
                  <td>{receiver.countryOfBirth}</td>
                  <td>{receiver.gender}</td>
                  <td>{receiver.postalCode}</td>
                  <td>{receiver.addressCity}</td>
                  <td>{receiver.addressCountryCode}</td>
                  <td>{receiver.idType}</td>
                  <td>{receiver.idNumber}</td>
                  <td>{receiver.idCountryCode}</td>
                  <td>{receiver.idDeliveryDate}</td>
                  <td>
                    {receiver.createdDateTime ? <TextFormat type="date" value={receiver.createdDateTime} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{receiver.isDeleted ? 'true' : 'false'}</td>
                  <td>{receiver.appUserId ? <Link to={`app-user/${receiver.appUserId}`}>{receiver.appUserId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${receiver.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${receiver.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${receiver.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Receivers found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={receiverList && receiverList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ receiver }: IRootState) => ({
  receiverList: receiver.entities,
  loading: receiver.loading,
  totalItems: receiver.totalItems,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Receiver);
