const getCommentsCount = (comments) => comments.length || 0;

const demoComments = [
  {
    username: 'Mike',
    message: 'Comment 1',
  },
  {
    username: 'Mike',
    message: 'Comment 2',
  },
  {
    username: 'Mike',
    message: 'Comment 3',
  },
  {
    username: 'Mike',
    message: 'Comment 4',
  },
];

export const displayPokemon = (pokemon) => {
  const popup = document.createElement('div');
  const cancel = document.createElement('span');
  cancel.innerHTML = 'x';
  cancel.id = 'cancel';
  const popupContainer = document.createElement('div');
  const pokemonImageContainer = document.createElement('div');
  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonImageContainer.appendChild(pokemonImage);
  pokemonImageContainer.classList.add('pokemon-image-wrapper');
  popup.classList.add('modal-body');
  popupContainer.classList.add('container-fluid');

  cancel.addEventListener('click', () => {
    const modal = document.querySelector('#pokemon-modal');
    modal.style.display = 'none';
  });

  popupContainer.appendChild(pokemonImageContainer);
  popupContainer.appendChild(commentDisplay(demoComments));
  popupContainer.appendChild(modalForm());
  popup.appendChild(popupContainer);
  popup.appendChild(cancel);
  const modalDisplay = document.querySelector('#pokemon-modal');
  modalDisplay.innerHTML = '';
  modalDisplay.appendChild(popup);

  modalDisplay.style.display = 'block';
};

const modalForm = () => {
  const wrapper = document.createElement('div');
  const heading = document.createElement('h6');
  heading.textContent = 'Add Comment';
  heading.classList.add('mb-2');
  heading.classList.add('pt-3');
  heading.classList.add('text-center');
  wrapper.classList.add('modal-form-wrapper');
  const form = document.createElement('form');
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
  submit.classList.add('btn', 'btn-sm', 'btn-primary', 'mt-4');

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
  commentCount.innerHTML = comments.length;
  const image = document.createElement('img');
  image.classList.add('comment-image');
  image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzRjvGlHeDau_ut4SiozBz-DuieevYUmbeRQ&usqp=CAU';

  commentHeader.appendChild(commentCount);
  commentHeader.appendChild(image);
  const ul = document.createElement('ul');
  ul.classList.add('list-group');
  comments.forEach((comment) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.classList.add('list-group-item', 'position-relative');
    li.textContent = comment.message;
    span.innerHTML = comment.username;
    span.classList.add('coment-author');
    li.appendChild(span);
    ul.appendChild(li);
  });
  wrapper.appendChild(commentHeader);
  wrapper.appendChild(ul);
  return wrapper;
};

export const displayModal = () => {
  document.querySelector('#popupComment').style.display = 'flex';
};

export const hideModal = () => {
  document.querySelector('#popupComment').style.display = 'none';
};

export default getCommentsCount;