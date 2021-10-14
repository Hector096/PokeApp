const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/vmeYO55GvyryU3TCtGRE';

export const getPokemon = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((json) => json);
    return response;
  } catch (e) {
    throw new Error(`API error! status: ${e.toString()}`);
  }
};

export const getLikes = async () => {
  const response = await fetch(`${BASE_URL}/likes/`);
  if (!response.ok) {
    throw new Error(`API error! status: ${response.status}`);
  } else {
    const data = await response.json();
    localStorage.setItem('likes', JSON.stringify(data));
    return data;
  }
};
export const postLike = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/likes/`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((json) => json);
    return response;
  } catch (e) {
    throw new Error(`API error! status: ${e.toString()}`);
  }
};

export const getComment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/comments?item_id=${id}`)
      .then((response) => response.json())
      .then((json) => json);
    return response.error ? [] : response;
  } catch (e) {
    throw new Error(`API error! status: ${e.toString()}`);
  }
};

export const postComment = async (itemId, username, comment) => {
  try {
    const response = await fetch(`${BASE_URL}/comments/`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: itemId,
        username,
        comment,
      }),
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response;
  } catch (e) {
    throw new Error(`API error! status: ${e.toString()}`);
  }
};
