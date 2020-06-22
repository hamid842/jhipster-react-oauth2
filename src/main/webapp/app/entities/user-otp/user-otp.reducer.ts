import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserOtp, defaultValue } from 'app/shared/model/user-otp.model';

export const ACTION_TYPES = {
  SEARCH_USEROTPS: 'userOtp/SEARCH_USEROTPS',
  FETCH_USEROTP_LIST: 'userOtp/FETCH_USEROTP_LIST',
  FETCH_USEROTP: 'userOtp/FETCH_USEROTP',
  CREATE_USEROTP: 'userOtp/CREATE_USEROTP',
  UPDATE_USEROTP: 'userOtp/UPDATE_USEROTP',
  DELETE_USEROTP: 'userOtp/DELETE_USEROTP',
  RESET: 'userOtp/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserOtp>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type UserOtpState = Readonly<typeof initialState>;

// Reducer

export default (state: UserOtpState = initialState, action): UserOtpState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_USEROTPS):
    case REQUEST(ACTION_TYPES.FETCH_USEROTP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USEROTP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USEROTP):
    case REQUEST(ACTION_TYPES.UPDATE_USEROTP):
    case REQUEST(ACTION_TYPES.DELETE_USEROTP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_USEROTPS):
    case FAILURE(ACTION_TYPES.FETCH_USEROTP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USEROTP):
    case FAILURE(ACTION_TYPES.CREATE_USEROTP):
    case FAILURE(ACTION_TYPES.UPDATE_USEROTP):
    case FAILURE(ACTION_TYPES.DELETE_USEROTP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_USEROTPS):
    case SUCCESS(ACTION_TYPES.FETCH_USEROTP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_USEROTP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USEROTP):
    case SUCCESS(ACTION_TYPES.UPDATE_USEROTP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USEROTP):
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

const apiUrl = 'api/user-otps';
const apiSearchUrl = 'api/_search/user-otps';

// Actions

export const getSearchEntities: ICrudSearchAction<IUserOtp> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_USEROTPS,
  payload: axios.get<IUserOtp>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IUserOtp> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_USEROTP_LIST,
    payload: axios.get<IUserOtp>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IUserOtp> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USEROTP,
    payload: axios.get<IUserOtp>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUserOtp> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USEROTP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserOtp> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USEROTP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserOtp> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USEROTP,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
