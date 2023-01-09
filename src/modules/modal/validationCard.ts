function validationCard(value: string) {
  if (value.length > 4 && value.length < 9) {
    value = value.replace(/(.{4})(.{1,4})/g, '$1 $2');
  }
  if (value.length > 8 && value.length < 13 && value[4] !== ' ') {
    value = value.replace(/(.{4})(.{4})(.{1,4})/g, '$1 $2 $3');
  }
  if (value.length > 12 && value[4] !== ' ') {
    value = value.replace(/(.{4})(.{4})(.{4})(.{1,4})/g, '$1 $2 $3 $4');
  }
  return value;
}

export default validationCard;
