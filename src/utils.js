/* eslint-disable camelcase */
import { getComment, postComment } from './data';

const getCount = (comments) => comments.length || 0;

const creatCommentLi = (comment, username, creation_date) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const commentSpan = document.createElement('span');
  const dateSpan = document.createElement('span');
  li.classList.add('list-group-item', 'position-relative', 'pt-3');
  commentSpan.textContent = comment;
  span.innerHTML = `${username}: `;
  dateSpan.innerHTML = creation_date;
  span.classList.add('comment-author');
  dateSpan.classList.add('comment-date');
  li.appendChild(dateSpan);
  li.appendChild(span);
  li.appendChild(commentSpan);
  return li;
};

const modalForm = (id) => {
  const wrapper = document.createElement('div');
  const heading = document.createElement('h6');
  heading.textContent = 'Add Comment';
  heading.classList.add('mb-2');
  heading.classList.add('pt-3');
  heading.classList.add('text-center');
  wrapper.classList.add('modal-form-wrapper');
  const form = document.createElement('form');
  form.classList.add('comment-form');
  const userNameLabel = document.createElement('label');
  const commentLabel = document.createElement('label');
  userNameLabel.textContent = 'Username: ';
  commentLabel.textContent = 'Comment: ';

  const userNameInput = document.createElement('input');
  userNameInput.name = 'username';
  userNameInput.classList.add('form-control');
  const commentInput = document.createElement('input');
  commentInput.name = 'comment';
  commentInput.classList.add('form-control');

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Submit';
  submit.classList.add('btn', 'btn-sm', 'submit-form-btn', 'mt-4');
  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    await postComment(id, userNameInput.value, commentInput.value);
    const newComment = creatCommentLi(
      commentInput.value,
      userNameInput.value,
      new Date().toLocaleDateString(),
    );
    document.querySelector('.comments-list').appendChild(newComment);
    const count = document.querySelector('.comment-count');
    count.innerHTML = parseInt(count.textContent, 10) + 1;
    form.reset();
  });

  form.appendChild(heading);
  form.appendChild(userNameLabel);
  form.appendChild(userNameInput);
  form.appendChild(commentLabel);
  form.appendChild(commentInput);
  form.appendChild(submit);

  return form;
};

const commentDisplay = (comments) => {
  const wrapper = document.createElement('div');
  const commentHeader = document.createElement('div');
  commentHeader.classList.add('comment-header');
  const commentCount = document.createElement('span');
  commentCount.classList.add('comment-count');
  commentCount.innerHTML = getCount(comments);
  const image = document.createElement('img');
  image.classList.add('comment-image');
  image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzRjvGlHeDau_ut4SiozBz-DuieevYUmbeRQ&usqp=CAU';

  commentHeader.appendChild(commentCount);
  commentHeader.appendChild(image);
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'comments-list');
  comments.forEach(({ comment, username, creation_date }) => {
    const li = creatCommentLi(comment, username, creation_date);
    ul.appendChild(li);
  });
  wrapper.appendChild(commentHeader);
  wrapper.appendChild(ul);
  return wrapper;
};

export const displayPokemon = async (pokemon) => {
  const popup = document.createElement('div');
  const cancel = document.createElement('span');
  cancel.innerHTML = 'x';
  cancel.id = 'cancel';
  const popupContainer = document.createElement('div');
  const pokemonImageContainer = document.createElement('div');
  const pokemonAbilities = document.createElement('ul');
  pokemonAbilities.classList.add('pokemon-attr');
  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonImageContainer.appendChild(pokemonImage);

  const comments = await getComment(pokemon.id);

  pokemon.abilities.forEach(({ ability }) => {
    const li = document.createElement('li');
    li.textContent = ability.name;
    pokemonAbilities.appendChild(li);
  });
  pokemonImageContainer.classList.add('pokemon-image-wrapper');
  popup.classList.add('modal-body', 'text-wrap');
  popupContainer.classList.add('container-fluid');

  cancel.addEventListener('click', () => {
    const modal = document.querySelector('#pokemon-modal');
    modal.style.display = 'none';
  });

  const flexWrapper = document.createElement('div');
  flexWrapper.classList.add('d-flex');
  flexWrapper.appendChild(modalForm(pokemon.id));
  flexWrapper.appendChild(commentDisplay(comments));

  popupContainer.appendChild(pokemonImageContainer);
  popupContainer.appendChild(pokemonAbilities);
  popupContainer.appendChild(flexWrapper);
  popup.appendChild(popupContainer);
  popup.appendChild(cancel);
  const modalDisplay = document.querySelector('#pokemon-modal');
  modalDisplay.innerHTML = '';
  modalDisplay.appendChild(popup);

  modalDisplay.style.display = 'block';
};

export const displayModal = () => {
  document.querySelector('#popupComment').style.display = 'flex';
};

export const hideModal = () => {
  document.querySelector('#popupComment').style.display = 'none';
};

export default getCount;