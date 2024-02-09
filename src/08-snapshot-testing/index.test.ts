import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = ['a', 'b', 'c'];
    const outputList = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 'c',
        },
        value: 'b',
      },
      value: 'a',
    };

    const result = generateLinkedList(values);

    expect(result).toStrictEqual(outputList);
  });

  test('should generate linked list from values 2', () => {
    const values = ['a', 'b', 'c'];

    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });
});
