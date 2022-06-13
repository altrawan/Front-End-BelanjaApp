/* eslint-disable default-param-last */
import {
  GET_DETAIL_USER_FAILED,
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
} from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const detailCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_USER_PENDING:
      return { ...state, isLoading: true };
    case GET_DETAIL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case GET_DETAIL_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default detailCustomerReducer;
