import React from 'react';
import {useSelector} from 'react-redux';
import {getIsUserAuth} from '../module/selectors';
import AuthRoutes from './AuthRoutes';
import NoAuthRoutes from './NoAuthRoutes';

const Router: React.FC = () => {
  const isAuth = useSelector(getIsUserAuth);
  console.log('isAuth == ', isAuth);
  return isAuth ? <AuthRoutes /> : <NoAuthRoutes />;
};
export default Router;
