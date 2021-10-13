import './style.css';
import Logo from '../asset/images/logo.png';
import getPokemon from './pokemonApiHandler';
import { displayPokemon } from './utils';

const logoImg = document.getElementById('logoDiv');
const mainDiv = document.getElementById('mainDiv');
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

const limit = 32;
const offset = 1;

const createPokemon = (item) => {
  const cardDiv = document.createElement('div');
  const div = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.classList.add('border-0');
  div.classList.add('card-body');
  const cardImg = document.createElement('img');
  cardImg.src = item.sprites.front_default;
  cardImg.alt = item.name;
  cardImg.classList.add('card-img-top');
  const h5 = document.createElement('h5');
  const like = document.createElement('i');
  like.classList.add('fas');
  like.classList.add('fa-heart');
  like.classList.add('text-center');
  like.classList.add('pb-2');
  like.style.color = 'red';
  like.innerText = ' Likes';
  h5.classList.add('text-center');
  h5.innerText = item.name.toUpperCase();
  const a = document.createElement('a');
  a.classList.add('btn');
  a.classList.add('btn-warning');
  a.classList.add('text-center');
  a.innerText = 'Comments';
  div.classList.add('d-flex');
  div.classList.add('flex-column');
  a.addEventListener('click', async (e) => {
    const { id } = item;
    console.log('click');
    displayPokemon(item);
  });

  div.appendChild(h5);
  div.appendChild(like);
  div.appendChild(a);
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(div);
  mainDiv.appendChild(cardDiv);
};
const fetchPokemon = async (id) => {
  const pokemon = await getPokemon(id);
  createPokemon(pokemon);
};
const fetchPokemons = (offset, limit) => {
  for (let i = offset; i <= offset + limit; i += 1) {
    fetchPokemon(i);
  }
};

fetchPokemons(offset, limit);
