import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReceiver, defaultValue } from 'app/shared/model/receiver.model';

export const ACTION_TYPES = {
  SEARCH_RECEIVERS: 'receiver/SEARCH_RECEIVERS',
  FETCH_RECEIVER_LIST: 'receiver/FETCH_RECEIVER_LIST',
  FETCH_RECEIVER: 'receiver/FETCH_RECEIVER',
  CREATE_RECEIVER: 'receiver/CREATE_RECEIVER',
  UPDATE_RECEIVER: 'receiver/UPDATE_RECEIVER',
  DELETE_RECEIVER: 'receiver/DELETE_RECEIVER',
  RESET: 'receiver/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReceiver>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ReceiverState = Readonly<typeof initialState>;

// Reducer

export default (state: ReceiverState = initialState, action): ReceiverState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RECEIVERS):
    case REQUEST(ACTION_TYPES.FETCH_RECEIVER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECEIVER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RECEIVER):
    case REQUEST(ACTION_TYPES.UPDATE_RECEIVER):
    case REQUEST(ACTION_TYPES.DELETE_RECEIVER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_RECEIVERS):
    case FAILURE(ACTION_TYPES.FETCH_RECEIVER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECEIVER):
    case FAILURE(ACTION_TYPES.CREATE_RECEIVER):
    case FAILURE(ACTION_TYPES.UPDATE_RECEIVER):
    case FAILURE(ACTION_TYPES.DELETE_RECEIVER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RECEIVERS):
    case SUCCESS(ACTION_TYPES.FETCH_RECEIVER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECEIVER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECEIVER):
    case SUCCESS(ACTION_TYPES.UPDATE_RECEIVER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECEIVER):
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

const apiUrl = 'api/receivers';
const apiSearchUrl = 'api/_search/receivers';

// Actions

export const getSearchEntities: ICrudSearchAction<IReceiver> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_RECEIVERS,
  payload: axios.get<IReceiver>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IReceiver> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RECEIVER_LIST,
    payload: axios.get<IReceiver>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IReceiver> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECEIVER,
    payload: axios.get<IReceiver>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IReceiver> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECEIVER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReceiver> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECEIVER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReceiver> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECEIVER,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
