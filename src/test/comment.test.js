import counter from '../utils';

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
    const len = counter(comments);
    expect(len).toBe(2);
    expect(len).not.toBe(3);
  });
});