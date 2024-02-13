import { useState } from 'react';

const initialState = {
  cookie: '',
};

export const useGlobalState = () => {
  const [state, setState] = useState(initialState);

  const setCookie = (value) => {
    setState({ ...state, cookie: value });
  };

  return {
    cookie: state.cookie,
    setCookie,
  };
};
