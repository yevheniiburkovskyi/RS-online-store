const inputTel = document.getElementById('modalInputTel') as HTMLInputElement;
const inputCvv = document.getElementById('modalInputCvv') as HTMLInputElement;
const inputCardNum = document.getElementById('modalInputCardNum') as HTMLInputElement;
const inputCardDate = document.getElementById('modalCardDate') as HTMLInputElement;

function modaleValidateEvent() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer?.addEventListener('click', (event) => {
    const eventTarget = event?.target;
    console.log(eventTarget);
    (eventTarget as HTMLInputElement).required = true;
    if (eventTarget === inputTel && !inputTel.value) {
      inputTel.value = '+';
    }
  });
}

inputTel.addEventListener('input', () => {
  inputTel.value = inputTel.value.replace(/[^\d]/g, '');
  inputTel.value = `+${inputTel.value}`;
});

inputCvv.addEventListener('input', () => {
  inputCvv.value = inputCvv.value.replace(/[^\d]/g, '');
});

inputCardNum.addEventListener('input', () => {
  inputCardNum.value = inputCardNum.value.replace(/[^\d]/g, '');
  if (inputCardNum.value.length > 4 && inputCardNum.value.length < 9) {
    inputCardNum.value = inputCardNum.value.replace(/(.{4})(.{4})/g, '$1 $2');
  }
  // inputCardNum.value = inputCardNum.value.replace(/(.{4})/g, '$1 ');
});

inputCardDate.addEventListener('input', () => {
  inputCardDate.value = inputCardDate.value.replace(/[^\d]/g, '');
  if (+inputCardDate.value > 1 && inputCardDate.value.length === 1) {
    inputCardDate.value = `0${inputCardDate.value}/`;
  }
  if (inputCardDate.value.length === 3 && inputCardDate.value[2] !== '/') {
    inputCardDate.value = `${inputCardDate.value[0]}${inputCardDate.value[1]}/${inputCardDate.value[2]}`;
  }
  if (inputCardDate.value.length === 4 && inputCardDate.value[2] !== '/') {
    inputCardDate.value = `${inputCardDate.value[0]}${inputCardDate.value[1]}/${inputCardDate.value[2]}${inputCardDate.value[3]}`;
  }
});

export default modaleValidateEvent;
