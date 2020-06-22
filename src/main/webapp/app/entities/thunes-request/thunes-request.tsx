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
import { getSearchEntities, getEntities } from './thunes-request.reducer';
import { IThunesRequest } from 'app/shared/model/thunes-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IThunesRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ThunesRequest = (props: IThunesRequestProps) => {
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

  const { thunesRequestList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="thunes-request-heading">
        Thunes Requests
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Thunes Request
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
        {thunesRequestList && thunesRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('referenceNumber')}>
                  Reference Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sourceAmount')}>
                  Source Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sourceCurrency')}>
                  Source Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('destinationAmount')}>
                  Destination Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('destinationCurrency')}>
                  Destination Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('countryCode')}>
                  Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('transactionStatus')}>
                  Transaction Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('transactionType')}>
                  Transaction Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('transactionDate')}>
                  Transaction Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('feeAmount')}>
                  Fee Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('feeCurrency')}>
                  Fee Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('quotationId')}>
                  Quotation Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('transactionId')}>
                  Transaction Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('quotationCreationDate')}>
                  Quotation Creation Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('quotationExpirationDate')}>
                  Quotation Expiration Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderFirstName')}>
                  Sender First Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderLastName')}>
                  Sender Last Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderNationalityCountryCode')}>
                  Sender Nationality Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderBirthDate')}>
                  Sender Birth Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderCountryOfBirth')}>
                  Sender Country Of Birth <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderGender')}>
                  Sender Gender <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderAddress')}>
                  Sender Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderPostalCode')}>
                  Sender Postal Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderCity')}>
                  Sender City <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderCountryCode')}>
                  Sender Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderMsisdn')}>
                  Sender Msisdn <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderEmail')}>
                  Sender Email <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderIdType')}>
                  Sender Id Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderIdNumber')}>
                  Sender Id Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderIdCountryCode')}>
                  Sender Id Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderIdDeliveryDate')}>
                  Sender Id Delivery Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('senderOccupation')}>
                  Sender Occupation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryFirstName')}>
                  Beneficiary First Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryLastName')}>
                  Beneficiary Last Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryNationalityCountryCode')}>
                  Beneficiary Nationality Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryBirthDate')}>
                  Beneficiary Birth Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryCountryOfBirth')}>
                  Beneficiary Country Of Birth <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryGender')}>
                  Beneficiary Gender <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryAddress')}>
                  Beneficiary Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryPostalCode')}>
                  Beneficiary Postal Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryCity')}>
                  Beneficiary City <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryCountryCode')}>
                  Beneficiary Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryMsisdn')}>
                  Beneficiary Msisdn <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryEmail')}>
                  Beneficiary Email <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryIdType')}>
                  Beneficiary Id Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryIdNumber')}>
                  Beneficiary Id Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryIdCountryCode')}>
                  Beneficiary Id Country Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryIdDeliveryDate')}>
                  Beneficiary Id Delivery Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('beneficiaryOccupation')}>
                  Beneficiary Occupation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('creditPartyMsisdn')}>
                  Credit Party Msisdn <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('creditPartyAccountNumber')}>
                  Credit Party Account Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('creditPartySwiftCode')}>
                  Credit Party Swift Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('wholesaleFxRate')}>
                  Wholesale Fx Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mode')}>
                  Mode <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('additionalInfo1')}>
                  Additional Info 1 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('additionalInfo2')}>
                  Additional Info 2 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('additionalInfo3')}>
                  Additional Info 3 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('purposeRemittance')}>
                  Purpose Remittance <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('documentReferenceNumber')}>
                  Document Reference Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('callbackUrl')}>
                  Callback Url <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('transactionCreationDate')}>
                  Transaction Creation Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('transactionExpirationDate')}>
                  Transaction Expiration Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('modifiedDate')}>
                  Modified Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  Created Date <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  App User <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Receiver <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {thunesRequestList.map((thunesRequest, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${thunesRequest.id}`} color="link" size="sm">
                      {thunesRequest.id}
                    </Button>
                  </td>
                  <td>{thunesRequest.referenceNumber}</td>
                  <td>{thunesRequest.sourceAmount}</td>
                  <td>{thunesRequest.sourceCurrency}</td>
                  <td>{thunesRequest.destinationAmount}</td>
                  <td>{thunesRequest.destinationCurrency}</td>
                  <td>{thunesRequest.countryCode}</td>
                  <td>{thunesRequest.transactionStatus}</td>
                  <td>{thunesRequest.transactionType}</td>
                  <td>
                    {thunesRequest.transactionDate ? (
                      <TextFormat type="date" value={thunesRequest.transactionDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{thunesRequest.feeAmount}</td>
                  <td>{thunesRequest.feeCurrency}</td>
                  <td>{thunesRequest.quotationId}</td>
                  <td>{thunesRequest.transactionId}</td>
                  <td>
                    {thunesRequest.quotationCreationDate ? (
                      <TextFormat type="date" value={thunesRequest.quotationCreationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {thunesRequest.quotationExpirationDate ? (
                      <TextFormat type="date" value={thunesRequest.quotationExpirationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{thunesRequest.senderFirstName}</td>
                  <td>{thunesRequest.senderLastName}</td>
                  <td>{thunesRequest.senderNationalityCountryCode}</td>
                  <td>{thunesRequest.senderBirthDate}</td>
                  <td>{thunesRequest.senderCountryOfBirth}</td>
                  <td>{thunesRequest.senderGender}</td>
                  <td>{thunesRequest.senderAddress}</td>
                  <td>{thunesRequest.senderPostalCode}</td>
                  <td>{thunesRequest.senderCity}</td>
                  <td>{thunesRequest.senderCountryCode}</td>
                  <td>{thunesRequest.senderMsisdn}</td>
                  <td>{thunesRequest.senderEmail}</td>
                  <td>{thunesRequest.senderIdType}</td>
                  <td>{thunesRequest.senderIdNumber}</td>
                  <td>{thunesRequest.senderIdCountryCode}</td>
                  <td>{thunesRequest.senderIdDeliveryDate}</td>
                  <td>{thunesRequest.senderOccupation}</td>
                  <td>{thunesRequest.beneficiaryFirstName}</td>
                  <td>{thunesRequest.beneficiaryLastName}</td>
                  <td>{thunesRequest.beneficiaryNationalityCountryCode}</td>
                  <td>{thunesRequest.beneficiaryBirthDate}</td>
                  <td>{thunesRequest.beneficiaryCountryOfBirth}</td>
                  <td>{thunesRequest.beneficiaryGender}</td>
                  <td>{thunesRequest.beneficiaryAddress}</td>
                  <td>{thunesRequest.beneficiaryPostalCode}</td>
                  <td>{thunesRequest.beneficiaryCity}</td>
                  <td>{thunesRequest.beneficiaryCountryCode}</td>
                  <td>{thunesRequest.beneficiaryMsisdn}</td>
                  <td>{thunesRequest.beneficiaryEmail}</td>
                  <td>{thunesRequest.beneficiaryIdType}</td>
                  <td>{thunesRequest.beneficiaryIdNumber}</td>
                  <td>{thunesRequest.beneficiaryIdCountryCode}</td>
                  <td>{thunesRequest.beneficiaryIdDeliveryDate}</td>
                  <td>{thunesRequest.beneficiaryOccupation}</td>
                  <td>{thunesRequest.creditPartyMsisdn}</td>
                  <td>{thunesRequest.creditPartyAccountNumber}</td>
                  <td>{thunesRequest.creditPartySwiftCode}</td>
                  <td>{thunesRequest.wholesaleFxRate}</td>
                  <td>{thunesRequest.mode}</td>
                  <td>{thunesRequest.additionalInfo1}</td>
                  <td>{thunesRequest.additionalInfo2}</td>
                  <td>{thunesRequest.additionalInfo3}</td>
                  <td>{thunesRequest.purposeRemittance}</td>
                  <td>{thunesRequest.documentReferenceNumber}</td>
                  <td>{thunesRequest.callbackUrl}</td>
                  <td>
                    {thunesRequest.transactionCreationDate ? (
                      <TextFormat type="date" value={thunesRequest.transactionCreationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {thunesRequest.transactionExpirationDate ? (
                      <TextFormat type="date" value={thunesRequest.transactionExpirationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {thunesRequest.modifiedDate ? (
                      <TextFormat type="date" value={thunesRequest.modifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {thunesRequest.createdDate ? (
                      <TextFormat type="date" value={thunesRequest.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {thunesRequest.appUserId ? <Link to={`app-user/${thunesRequest.appUserId}`}>{thunesRequest.appUserId}</Link> : ''}
                  </td>
                  <td>
                    {thunesRequest.receiverId ? <Link to={`receiver/${thunesRequest.receiverId}`}>{thunesRequest.receiverId}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${thunesRequest.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${thunesRequest.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${thunesRequest.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Thunes Requests found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={thunesRequestList && thunesRequestList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ thunesRequest }: IRootState) => ({
  thunesRequestList: thunesRequest.entities,
  loading: thunesRequest.loading,
  totalItems: thunesRequest.totalItems,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThunesRequest);
