const formatPhone = phone => {
  let regExArray = phone.match(/[0-9]{0,14}/g);

  // Join parts returned from RegEx match
  newString = regExArray.join('');
  if (newString.length !== 10) {
    throw new Error('Please enter a 10 digit phone number');
  }
  // Start number with "+"
  newString = `+1${newString}`;

  return newString;
};

export default formatPhone;
