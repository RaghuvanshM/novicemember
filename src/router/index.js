import React from 'react';
import {useSelector} from 'react-redux';
import {getIsAuth, getIsUserAuth} from '../module/selectors';
import AuthRoutes from './AuthRoutes';
import NoAuthRoutes from './NoAuthRoutes';

const Router= () => {
  const isAuth = useSelector(getIsAuth);

  return !isAuth ? <AuthRoutes /> : <NoAuthRoutes />;
};
export default Router;
