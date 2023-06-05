import updateHeader from '../cart/updateHeader';
import { handleLocation } from '../router/router';
import validationCard from './validationCard';
import validationDate from './validationDate';

const inputTel = document.getElementById('modalInputTel') as HTMLInputElement;
const inputCvv = document.getElementById('modalInputCvv') as HTMLInputElement;
const inputCardNum = document.getElementById('modalInputCardNum') as HTMLInputElement;
const inputCardDate = document.getElementById('modalCardDate') as HTMLInputElement;
const modalWindow = document.querySelector('.modal-container') as HTMLInputElement;
const modalCrossBtn = document.querySelector('.modal-cross-btn') as HTMLInputElement;

function modaleValidateEvent() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer?.addEventListener('click', (event) => {
    const eventTarget = event?.target;
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
  inputCardNum.value = validationCard(inputCardNum.value);
  console.log(inputCardNum.value);
  (document.querySelector('.credit-block__icon') as HTMLElement).className = 'credit-block__icon';

  if (inputCardNum.value[0] === '3') {
    (document.querySelector('.credit-block__icon') as HTMLElement).classList.add('credit-block__icon_aexpress');
  }
  if (inputCardNum.value[0] === '4') {
    (document.querySelector('.credit-block__icon') as HTMLElement).classList.add('credit-block__icon_visa');
  }
  if (inputCardNum.value[0] === '5') {
    (document.querySelector('.credit-block__icon') as HTMLElement).classList.add('credit-block__icon_mcard');
  }
  if (inputCardNum.value[0] === '6') {
    (document.querySelector('.credit-block__icon') as HTMLElement).classList.add('credit-block__icon_up');
  }
});

inputCardDate.addEventListener('input', () => {
  inputCardDate.value = inputCardDate.value.replace(/[^\d]/g, '');

  inputCardDate.value = validationDate(inputCardDate.value);
});

modalCrossBtn.addEventListener('click', () => {
  modalWindow.classList.toggle('modal-container_hide');
  const inputArr = document.querySelectorAll('.modal-content__input');
  inputArr.forEach((e) => {
    (e as HTMLInputElement).required = false;
    (e as HTMLInputElement).value = ``;
  });
});
addEventListener('click', (e) => {
  if (e.target === document.querySelector('.total-buy-btn')) {
    modalWindow.classList.toggle('modal-container_hide');
    const inputArr = document.querySelectorAll('.modal-content__input');
    inputArr.forEach((e) => {
      (e as HTMLInputElement).required = false;
      (e as HTMLInputElement).value = ``;
    });
  }
  if (e.target === document.querySelector('.modal-content__btn')) {
    e.preventDefault();
    const inputArr = document.querySelectorAll('.modal-content__input');
    inputArr.forEach((e) => {
      (e as HTMLInputElement).required = true;
    });
    if ((document.querySelector('.modal-content') as HTMLFormElement).reportValidity()) {
      (document.querySelector('.modal-content') as HTMLElement).classList.add('modal-container_hide');
      (document.querySelector('.modal-close-message') as HTMLElement).classList.remove('modal-container_hide');
      setTimeout(returnToStore, 3000);
    }
  }
});

function returnToStore() {
  window.history.pushState({}, '', '/');
  handleLocation();
  modalWindow.classList.toggle('modal-container_hide');
  (document.querySelector('.modal-content') as HTMLElement).classList.remove('modal-container_hide');
  (document.querySelector('.modal-close-message') as HTMLElement).classList.add('modal-container_hide');
  (document.querySelector('.cart-icon__count') as HTMLDivElement).innerHTML = '0';
  (document.querySelector('.cart-block__total-price') as HTMLDivElement).innerHTML = `Cart total: $0`;
  localStorage.clear();
  updateHeader();
}

export default modaleValidateEvent;
