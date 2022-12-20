import { Block, renderDOM } from './core';
import './styles/styles.css';

import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { HomePage } from './pages/home';
import { ProfilePage } from './pages/profile';

const path: string = window.location.pathname
let component: Block

switch (path) {
  case '/': {
    component = new HomePage({})
    break
  }
  case '/login': {
    component = new LoginPage({})
    break
  }
  case '/register': {
    component = new RegisterPage({})
    break
  }
  case '/profile': {
    component = new ProfilePage({})
    break
  }
}

document.addEventListener('DOMContentLoaded', () => {
    renderDOM(component);
});
