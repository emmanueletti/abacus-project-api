module.exports = (num) => {
  if (isNaN(num)) return null;

  const roundedNum = Math.round(num);

  // turn number into a reversed array of strings
  const reversedStrings = roundedNum.toString().split('').reverse();

  // iterate through the array of strings and after every 3 char insert a comma
  const commaSeperatedStrings = reversedStrings.reduce((acc, el, i) => {
    // only after every 3 iterations
    if (i % 3 === 0) {
      acc.push(',');
    }
    acc.push(el);
    return acc;
  }, []);

  // return the result in the correct order as a joined string
  const result = commaSeperatedStrings.slice(1).reverse().join('');

  return `$${result}`;
};
