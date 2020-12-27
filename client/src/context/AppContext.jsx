import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  isLoading: true,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
  transactionDropdown: 'My Orders',
  follow: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: localStorage.setItem(
          'user',
          JSON.stringify({
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.fullname,
            avatar: action.payload.avatar,
          })
        ),
        token: localStorage.setItem('token', action.payload.token),
      };

    case 'USER_LOADED':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: localStorage.setItem(
          'user',
          JSON.stringify({
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.fullname,
            avatar: action.payload.avatar,
          })
        ),
      };

    case 'EDIT_USER':
      return {
        ...state,
        user: localStorage.setItem(
          'user',
          JSON.stringify({
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.fullname,
            avatar: action.payload.avatar,
            greeting: action.payload.greeting,
          })
        ),
      };
    case 'FOLLOW':
      return {
        ...state,
        follow: action.payload.follow,
      };
    case 'LOAD_FOLLOW':
      return {
        ...state,
        follow: action.payload.follow,
      };
    case 'UNFOLLOW':
      return {
        ...state,
        follow: action.payload.follow,
      };

    case 'DROPDOWN_ORDERS':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        transactionDropdown: 'My Orders',
      };
    case 'DROPDOWN_OFFERS':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        transactionDropdown: 'My Offers',
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        user: localStorage.removeItem('user'),
        token: localStorage.removeItem('token'),
      };
    default:
      throw console.log(new Error());
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
