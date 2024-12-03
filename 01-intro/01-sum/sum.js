export default function sum(a, b) {
  Array.from(arguments).forEach(arg => {
    if (typeof arg !== 'number') {
      throw new TypeError(`${arg} not a number`);
    }
  })
  return a + b;
}
