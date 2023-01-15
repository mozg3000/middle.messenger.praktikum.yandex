import { LoginPage } from '../../pages/login';
import { ProfilePage } from '../../pages/profile';
import { BlockClass } from '../../core';
/* eslint-disable */
export enum Screens {
  Login = 'login',
  Profile = 'profile',
}
/* eslint-enable */

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: LoginPage,
  [Screens.Profile]: ProfilePage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
