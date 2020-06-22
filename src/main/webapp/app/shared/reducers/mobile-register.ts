import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  GET_OTP: 'mobileRegister/GET_OTP',
  ERROR_MESSAGE: 'mobileRegister/ERROR_MESSAGE',
};

const initialState = {
  isValid: false,
  loading: false,
  errorMessage: (null as unknown) as string, // Errors returned from server side
};

export type MobileRegisterState = Readonly<typeof initialState>;

// Reducers
export default (state: MobileRegisterState = initialState, action): MobileRegisterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_OTP):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_OTP):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case SUCCESS(ACTION_TYPES.GET_OTP): {
      const isValid = action.payload && action.payload.data;
      return {
        ...initialState,
        isValid,
        loading: false,
      };
    }
    default:
      return state;
  }
};

const url = 'https://gateway.m1payall.com/aquila/api/users/register';
// Actions
export const getOtp = (phone: string) => {
  const requestBody = {
    mobile: phone,
  };
  const payload = axios.post(url, requestBody).catch(error => {
    const message = error.response.data.detail.replace('400 BAD_REQUEST', '').replace(/"/g, '');
    throw new Error(message);
  });
  return {
    type: ACTION_TYPES.GET_OTP,
    payload,
  };
};
