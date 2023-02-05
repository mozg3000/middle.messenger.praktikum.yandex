import { LoginPage } from '../../pages/login';
import ProfilePage from '../../pages/profile/ProfilePage';
import { BlockClass } from '../../core';
import { RegisterPage } from '../../pages/register';
import Chat from "../../pages/chat/Chat";

/* eslint-disable */
export enum Screens {
  Login = 'login',
  Register = 'register',
  Profile = 'profile',
  Chats = 'chats'
}
/* eslint-enable */

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: LoginPage,
  [Screens.Register]: RegisterPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Chats]: Chat
}

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen]
}
