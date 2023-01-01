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
    inputCardNum.value = inputCardNum.value.replace(/(.{4})(.{1,4})/g, '$1 $2');
  }
  if (inputCardNum.value.length > 8 && inputCardNum.value.length < 13 && inputCardNum.value[4] !== ' ') {
    inputCardNum.value = inputCardNum.value.replace(/(.{4})(.{4})(.{1,4})/g, '$1 $2 $3');
  }
  if (inputCardNum.value.length > 12 && inputCardNum.value[4] !== ' ') {
    inputCardNum.value = inputCardNum.value.replace(/(.{4})(.{4})(.{4})(.{1,4})/g, '$1 $2 $3 $4');
  }

  document
    .querySelector('.credit-block__icon')
    ?.setAttribute(
      'src',
      'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71'
    );
  if (inputCardNum.value[0] === '3') {
    document
      .querySelector('.credit-block__icon')
      ?.setAttribute(
        'src',
        'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg'
      );
  }
  if (inputCardNum.value[0] === '4') {
    document
      .querySelector('.credit-block__icon')
      ?.setAttribute('src', 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png');
  }
  if (inputCardNum.value[0] === '5') {
    document
      .querySelector('.credit-block__icon')
      ?.setAttribute('src', 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg');
  }
  if (inputCardNum.value[0] === '6') {
    document
      .querySelector('.credit-block__icon')
      ?.setAttribute('src', 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png');
  }
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

modalCrossBtn.addEventListener('click', () => {
  modalWindow.classList.toggle('modal-container_hide');
  const inputArr = document.querySelectorAll('.modal-content__input');
  inputArr.forEach((e) => {
    (e as HTMLInputElement).required = false;
    (e as HTMLInputElement).value = ``;
  });
});
(document.querySelector('.store-logo') as HTMLElement).addEventListener('click', () => {
  modalWindow.classList.toggle('modal-container_hide');
  const inputArr = document.querySelectorAll('.modal-content__input');
  inputArr.forEach((e) => {
    (e as HTMLInputElement).required = false;
    (e as HTMLInputElement).value = ``;
  });
});

export default modaleValidateEvent;
