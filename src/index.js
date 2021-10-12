import './style.css';
import Logo from '../asset/images/logo.png';

const logoImg = document.getElementById('logoDiv');
const myIcon = new Image();
myIcon.src = Logo;
myIcon.alt = 'Pokemon';
myIcon.id = 'logo';
logoImg.appendChild(myIcon);

const myFooter = document.getElementById('footer');
myFooter.classList.add('d-flex');
myFooter.classList.add('justify-content-center');
myFooter.classList.add('align-items-center');
document.body.appendChild(myFooter);
const p1 = document.createElement('p');
const txt1 = document.createTextNode('Copyright © 2021 Created By Ade & Hector');
p1.className += (' text-muted text-center');
p1.appendChild(txt1);
myFooter.appendChild(p1);
