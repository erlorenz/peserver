export default unformattedNumber => {
  let regExArray = unformattedNumber.match(/[0-9]{0,14}/g);

  // Join parts returned from RegEx match
  const newString = regExArray.join('');
  if (newString.length !== 10) {
    throw new Error('Please enter a 10 digit phone number');
  }
  // Start number with "+"
  const final = `+1${newString}`;

  return final;
};
