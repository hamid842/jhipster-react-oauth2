export interface IUserOtp {
  id?: number;
  msisdn?: string;
  tacCode?: string;
  tacExpiryTime?: string;
  isTacVerified?: boolean;
  setPassword?: boolean;
  resetPassword?: string;
}

export const defaultValue: Readonly<IUserOtp> = {
  isTacVerified: false,
  setPassword: false,
};
