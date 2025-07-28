import { describe, test, expect } from 'vitest';
import { convertSnakeToCamel, convertCamelToSnake, capitalizeWord } from './utils';

describe('convertSnakeToCamel', () => {
  test('converts a snake-case name to camel-case', () => {
    expect(convertSnakeToCamel('lord_of_the_rings')).toBe('lordOfTheRings');
  });
});

describe('convertCamelToSnake', () => {
  test('converts a camel-case name to snake-case', () => {
    expect(convertCamelToSnake('lordOfTheRings')).toBe('lord_of_the_rings');
  });
});

describe('capitalizeWord', () => {
  test('capitalizes a lowercase word', () => {
    expect(capitalizeWord('banana')).toBe('Banana');
  });
});
