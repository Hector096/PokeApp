const getPokemon = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((json) => json);
    return response;
  } catch (e) {
    throw e.toString();
  }
};

export default getPokemon;