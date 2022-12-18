import {Block, renderDOM} from './core';
import './styles/styles.css';

import LoginPage from './pages/login';
import { RegisterPage } from './pages/register';
import { HomePage } from './pages/home';

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
}

document.addEventListener('DOMContentLoaded', () => {
    renderDOM(component);
});
