function validationDate(value: string) {
  if (+value > 1 && value.length === 1) {
    value = `0${value}/`;
  }
  if (value.length === 3 && value[2] !== '/') {
    value = `${value[0]}${value[1]}/${value[2]}`;
  }
  if (value.length === 4 && value[2] !== '/') {
    value = `${value[0]}${value[1]}/${value[2]}${value[3]}`;
  }
  return value;
}

export default validationDate;
