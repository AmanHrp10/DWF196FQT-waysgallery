import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  user: null,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        user: {
          id: action.payload.id,
        },
      };

    case 'CHANNEL_LOADED':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isLogin: false,
        isLoading: false,
      };
    default:
      throw new Error();
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
