'use strict';

const modalAdd = document.querySelector('.modal__add'),
   addAd = document.querySelector('.add__ad'),
   modalBtnSubmit = document.querySelector('.modal__btn-submit'),
   modalSubmit = document.querySelector('.modal__submit');

addAd.addEventListener('click', () => {
   modalAdd.classList.remove('hide'); //закрытие модального окна 
   modalBtnSubmit.disabled = true; // отключение кнопки при пустых полях
});

modalAdd.addEventListener('click', event => {
   const target = event.target;

   if (target.classList.contains('modal__close') || target === modalAdd) {
      modalAdd.classList.add('hide'); //закрытие при клике вне модального окна
      modalSubmit.reset(); //очищение полей формы при закрытии
   }
});