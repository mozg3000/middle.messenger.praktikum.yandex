import { LoginPage } from '../../pages/login';
import { ProfilePage } from '../../pages/profile';
import { BlockClass } from '../../core';
import { RegisterPage } from '../../pages/register';

/* eslint-disable */
export enum Screens {
  Login = 'login',
  Register = 'register',
  Profile = 'profile',
}
/* eslint-enable */

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: LoginPage,
  [Screens.Register]: RegisterPage,
  [Screens.Profile]: ProfilePage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
