import './style.css';
import Logo from '../asset/images/logo.png';

const myFooter = document.getElementById('footer');
document.body.appendChild(myFooter);
const p = document.createElement('P');
const txt = document.createTextNode('Copyright ©, 2021');
txt.class = 'flex';
p.appendChild(txt);
myFooter.appendChild(p);

const logoImg = document.getElementById('logoDiv');
const myIcon = new Image();
myIcon.src = Logo;
myIcon.alt = 'Pokemon';
myIcon.id = 'logo';
logoImg.appendChild(myIcon);