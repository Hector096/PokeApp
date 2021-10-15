import counter from '../counter';

const pokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
  },
  {
    id: 2,
    name: 'Pikachu',
  },
  {
    id: 3,
    name: 'Ditto',
  },
];

describe('Pokemon Counter function Test', () => {
  test('should return pokemon array length of 3', () => {
    const pokemonLength = counter.pokemon(pokemons);
    expect(pokemonLength).toBe(3);
  });

  test('should return pokemon array length of 4 ', () => {
    pokemons.push(
      {
        id: 4,
        name: 'Bulbasaur1',
      },
      {
        id: 5,
        name: 'Pikachu2',
      },
      {
        id: 6,
        name: 'Ditto3',
      },
    );
    const pokemonLength = counter.pokemon(pokemons);
    expect(pokemonLength).toBe(6);
  });
});

const comments = [
  {
    username: 'Test',
    comment: 'James',
  },
  {
    username: 'Test2',
    comment: 'Mike',
  },
];

describe('Comment Counter function Test', () => {
  test('should return comment array length of 2', () => {
    const len = counter.comments(comments);
    expect(len).toBe(2);
    expect(len).not.toBe(3);
  });
});