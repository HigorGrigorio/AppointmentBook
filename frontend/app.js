import 'core-js/stable'
import 'regenerator-runtime/runtime'

import './assets/sass/style.sass'
import './assets/img/notebook.png'
import './assets/img/checklist.svg'
import './assets/img/envelope.svg'
import './assets/img/key.svg'
import './assets/img/user.svg'
import './assets/img/user.png'
import './assets/img/plus.png'
import './assets/img/delete.png'
import './assets/img/add-user.png'
import './assets/img/telephone.svg'

import Login from './modules/LoginValidator'
import Register from './modules/RegisterValidator'
import User from './modules/UserValidator'

const login = new Login('.form-login');
const register = new Register('.form-register');
const user = new User('.contact-form');

login.init();
register.init();
user.init();

document.getElementsByClassName('logo')[0].addEventListener('click', e => {
    e.preventDefault();

    const navControl = document.getElementById('nav-control');
    const { checked } = navControl;
    navControl.checked = !checked;
});
