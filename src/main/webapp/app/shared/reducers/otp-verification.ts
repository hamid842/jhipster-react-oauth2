import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  CHECK_OTP: 'mobileRegister/CHECK_OTP',
  ERROR_MESSAGE: 'mobileRegister/ERROR_MESSAGE',
};

const initialState = {
  otp: (null as unknown) as string,
  loading: false,
  otpIsValid: false,
  errorMessage: (null as unknown) as string, // Errors returned from server side
};

export type OtpVerification = Readonly<typeof initialState>;

// Reducers
export default (state: OtpVerification = initialState, action): OtpVerification => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.CHECK_OTP):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.CHECK_OTP):
      return {
        ...state,
        loading: false,
        otpIsValid: false,
        errorMessage: action.payload,
      };

    case SUCCESS(ACTION_TYPES.CHECK_OTP): {
      return {
        ...state,
        loading: false,
        otpIsValid: true,
        otp: action.payload.data,
      };
    }
    default:
      return state;
  }
};

export const displayError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

const url = 'https://gateway.m1payall.com/aquila/api/users/check-otp';
// Actions
export const checkOtp = (phone: string, otp: string) => {
  const requestUrl = `${url}?mobile=${phone}?otp${otp}`;
  return {
    type: ACTION_TYPES.CHECK_OTP,
    payload: axios.post(requestUrl),
  };
};
