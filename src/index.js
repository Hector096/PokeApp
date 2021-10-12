import './style.css';
import Logo from '../asset/images/logo.png';

const logoImg = document.getElementById('logoDiv');
const myIcon = new Image();
myIcon.src = Logo;
myIcon.alt = 'Pokemon';
myIcon.id = 'logo';
logoImg.appendChild(myIcon);