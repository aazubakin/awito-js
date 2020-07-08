'use strict';

const modalAdd = document.querySelector('.modal__add'),
   addAd = document.querySelector('.add__ad'),
   modalBtnSubmit = document.querySelector('.modal__btn-submit'),
   modalSubmit = document.querySelector('.modal__submit'),
   catalogModal = document.querySelector('.catalog'),
   modalItem = document.querySelector('.modal__item');

addAd.addEventListener('click', () => {
   modalAdd.classList.remove('hide'); //открытие модального окна 
   modalBtnSubmit.disabled = true; // отключение кнопки при пустых полях
});

modalAdd.addEventListener('click', event => {
   const target = event.target;

   if (target.classList.contains('modal__close') || target === modalAdd) {
      modalAdd.classList.add('hide'); //закрытие при клике вне модального окна
      modalSubmit.reset(); //очищение полей формы при закрытии
   }
});

catalogModal.addEventListener('click', () => {
   modalItem.classList.remove('hide'); // открытие при клике на карточку
});

modalItem.addEventListener('click', event => {
   const target = event.target;

   if (target.classList.contains('modal__close') || target === modalItem) {
      modalItem.classList.add('hide'); //закрытие при клике вне модального окна
      modalSubmit.reset(); //очищение полей формы при закрытии
   }
});

document.addEventListener('keydown', event => {
   const keyName = event.key;
   if (keyName === 'Escape') {
      modalItem.classList.add('hide');
      modalAdd.classList.add('hide');
   }
});