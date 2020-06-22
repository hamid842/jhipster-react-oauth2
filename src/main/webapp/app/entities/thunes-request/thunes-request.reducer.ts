import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IThunesRequest, defaultValue } from 'app/shared/model/thunes-request.model';

export const ACTION_TYPES = {
  SEARCH_THUNESREQUESTS: 'thunesRequest/SEARCH_THUNESREQUESTS',
  FETCH_THUNESREQUEST_LIST: 'thunesRequest/FETCH_THUNESREQUEST_LIST',
  FETCH_THUNESREQUEST: 'thunesRequest/FETCH_THUNESREQUEST',
  CREATE_THUNESREQUEST: 'thunesRequest/CREATE_THUNESREQUEST',
  UPDATE_THUNESREQUEST: 'thunesRequest/UPDATE_THUNESREQUEST',
  DELETE_THUNESREQUEST: 'thunesRequest/DELETE_THUNESREQUEST',
  RESET: 'thunesRequest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IThunesRequest>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ThunesRequestState = Readonly<typeof initialState>;

// Reducer

export default (state: ThunesRequestState = initialState, action): ThunesRequestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_THUNESREQUESTS):
    case REQUEST(ACTION_TYPES.FETCH_THUNESREQUEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THUNESREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_THUNESREQUEST):
    case REQUEST(ACTION_TYPES.UPDATE_THUNESREQUEST):
    case REQUEST(ACTION_TYPES.DELETE_THUNESREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_THUNESREQUESTS):
    case FAILURE(ACTION_TYPES.FETCH_THUNESREQUEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THUNESREQUEST):
    case FAILURE(ACTION_TYPES.CREATE_THUNESREQUEST):
    case FAILURE(ACTION_TYPES.UPDATE_THUNESREQUEST):
    case FAILURE(ACTION_TYPES.DELETE_THUNESREQUEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_THUNESREQUESTS):
    case SUCCESS(ACTION_TYPES.FETCH_THUNESREQUEST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_THUNESREQUEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_THUNESREQUEST):
    case SUCCESS(ACTION_TYPES.UPDATE_THUNESREQUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_THUNESREQUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/thunes-requests';
const apiSearchUrl = 'api/_search/thunes-requests';

// Actions

export const getSearchEntities: ICrudSearchAction<IThunesRequest> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_THUNESREQUESTS,
  payload: axios.get<IThunesRequest>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IThunesRequest> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_THUNESREQUEST_LIST,
    payload: axios.get<IThunesRequest>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IThunesRequest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THUNESREQUEST,
    payload: axios.get<IThunesRequest>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IThunesRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THUNESREQUEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IThunesRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THUNESREQUEST,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IThunesRequest> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_THUNESREQUEST,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
