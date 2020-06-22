// import axios from 'axios';
// import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

// export const ACTION_TYPES = {
//     GET_PROFILE: 'profile/GET_PROFILE',
//     EDIT_PROFILE: 'profile/EDIT_PROFILE',
//   };

//   const initialState = {
//       id:'',
//       profile:{},
//       loading:false,
//       errorMessage: (null as unknown) as string,
//   }

//   export type GetProfileState = Readonly<typeof initialState>;

//   // Reducers
// export default (state: GetProfileState = initialState, action): GetProfileState => {
//     switch (action.type) {
//       case REQUEST(ACTION_TYPES.GET_PROFILE):
//         return {
//           ...state,
//           loading: true,
//         };
//       case FAILURE(ACTION_TYPES.GET_PROFILE):
//         return {
//           ...state,
//           loading: false,
//           errorMessage: action.payload,
//         };

//       case SUCCESS(ACTION_TYPES.GET_PROFILE): {
//         return {
//           ...initialState,
//           profile:action.payloud.data,

//           loading: false,
//         };
//       }
//       default:
//         return state;
//     }
//   };

//   const url = `https://gateway.m1payall.com/aquila/api/app-users/${id}`;
// // Actions
// export const getProfile = (id: string) => {
//   const payload = axios.post(url).catch(error => {
//     throw new Error('The user is not found');
//   });
//   return {
//     type: ACTION_TYPES.GET_PROFILE,
//     payload,
//   };
// };
