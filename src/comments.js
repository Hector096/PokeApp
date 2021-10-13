import getCommentsCount from './utils';

export const displayComments = (items) => {
  document.getElementById('comments-display').innerHTML = '';
  document.getElementById('c-count').innerHTML = getCommentsCount(items);
  items.forEach((element) => {
    document.getElementById('comments-display').innerHTML += `${element.creation_date} ${element.username}: ${element.comment}</br>`;
  });
};

export const addComment = (name, comment) => {
  const commentsDiv = document.querySelector('#comments-display');
  const newDate = new Date().toLocaleDateString();
  const oldComments = commentsDiv.innerHTML.split('<br>');
  let newComments = `${oldComments[1]} <br>`;
  newComments += `${newDate} ${name}: ${comment}`;
  commentsDiv.innerHTML = newComments;
};
