export function convertCamelToSnake(input: string) {
  const tokens = input.split(/(?=[A-Z])/);
  const inputToSnakeCase = tokens.join('_').toLowerCase();

  return inputToSnakeCase;
}

export function convertSnakeToCamel(input: string) {
  const tokens = input.split('_');
  const inputToCamelCase = tokens.map((token, index) => {
    return index === 0 ? token : capitalizeWord(token);
  }).join('');

  return inputToCamelCase;
}

export function capitalizeWord(word: string) {
  const firstChar = word[0].toUpperCase();
  const remainingChars = word.slice(1);

  return firstChar + remainingChars;
}
