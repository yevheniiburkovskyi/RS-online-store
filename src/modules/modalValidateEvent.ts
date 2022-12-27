const inputName = document.getElementById('modalInputName') as HTMLInputElement;
const inputTel = document.getElementById('modalInputTel') as HTMLInputElement;

function modaleValidateEvent() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer?.addEventListener('click', (event) => {
    const eventTarget = event?.target;
    console.log(eventTarget);
    if (eventTarget === inputName) {
      validateName();
    }
    if (eventTarget === inputTel) {
      validateTel(eventTarget);
    }
  });
}

function validateName() {
  inputName.required = true;
}
function validateTel(eventTarget: EventTarget) {
  inputTel.required = true;
  inputTel.value = '+';
  inputTel.addEventListener('input', () => {
    (eventTarget as HTMLInputElement).value = (eventTarget as HTMLInputElement).value.replace(/[^+\d]/g, '');
  });
}

export default modaleValidateEvent;
