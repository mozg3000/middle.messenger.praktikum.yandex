import { renderDOM }  from './core';
import './styles/styles.css';

import LoginPage from './pages/login'

document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new LoginPage({}));
});
