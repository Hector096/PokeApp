/* eslint-disable camelcase */
import { getComment, postComment } from './data';
import counter from './counter';

const toaster = (message, classes) => {
  const toasterDiv = document.querySelector('#toast');
  toasterDiv.innerHTML = '';
  toasterDiv.innerHTML = message;
  toasterDiv.style.background = classes === 'toast--success' ? '#00c02b' : '#d50000';
  toasterDiv.classList.add(classes);
  setTimeout(() => toasterDiv.classList.remove(classes), 3000);
};

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
  heading.classList.add('mb-1', 'pt-1', 'text-center');
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
    try {
      if (!userNameInput.value || !commentInput.value) {
        toaster('Username and Comment required!', 'toast--error');
        return false;
      }
      if (/\d+/.test(userNameInput.value) || /\d+/.test(commentInput.value)) {
        toaster('Only alphabets allowed!', 'toast--error');
        return false;
      }
      const res = await postComment(id, userNameInput.value, commentInput.value);
      if (res) {
        const newComment = creatCommentLi(
          commentInput.value,
          userNameInput.value,
          new Date().toLocaleDateString(),
        );
        document.querySelector('.comments-list').appendChild(newComment);
        const count = document.querySelector('.comment-count');
        count.innerHTML = parseInt(count.textContent, 10) + 1;
        toaster('Comment Created successfully!', 'toast--success');
      } else {
        toaster('An error ocurred', 'toast--error');
      }
    } catch (e) {
      toaster('An error ocurred', 'toast--error');
    }
    return form.reset();
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
  commentCount.innerHTML = counter.comments(comments);
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
  const pokemonPropContainer = document.createElement('div');
  pokemonPropContainer.classList.add('d-flex');
  const pokemonProp = document.createElement('h5');
  pokemonProp.innerHTML = ('Abilities: ');
  pokemonProp.classList.add('propWidth', 'text-center');
  const pokemonAbilities = document.createElement('ul');
  pokemonAbilities.classList.add('pokemon-attr');
  pokemonPropContainer.appendChild(pokemonProp);
  pokemonPropContainer.appendChild(pokemonAbilities);
  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemon.sprites.front_default;
  const pokemonName = document.createElement('h5');
  pokemonName.innerHTML = pokemon.name.toUpperCase();
  pokemonName.classList.add('text-center', 'pt-0');
  pokemonImageContainer.appendChild(pokemonImage);

  const comments = await getComment(pokemon.id);

  pokemon.abilities.forEach(({ ability }) => {
    const li = document.createElement('li');
    li.textContent = ability.name;
    pokemonProp.appendChild(li);
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
  popupContainer.appendChild(pokemonName);
  popupContainer.appendChild(pokemonPropContainer);
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