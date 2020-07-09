'use strict';

const modalAdd = document.querySelector('.modal__add'),
   addAd = document.querySelector('.add__ad'),
   modalBtnSubmit = document.querySelector('.modal__btn-submit'),
   modalSubmit = document.querySelector('.modal__submit'),
   catalog = document.querySelector('.catalog'),
   modalItem = document.querySelector('.modal__item');

const elementsModalSubmit = modalSubmit.elements;
console.log([...elementsModalSubmit].filter((elem) => {
   return elem.tagName !== 'BUTTON';
}));

const closeModal = function (event) {
   const target = event.target;

   if (target.closest('.modal__close') || target === this) {
      this.classList.add('hide'); //закрытие при клике вне модального окна
      if (this === modalAdd) {
         modalSubmit.reset(); //очищение полей формы при закрытии
      }
   }
};
const closeModalEsc = (event) => {
   const keyName = event.key;
   if (keyName === 'Escape') {
      modalItem.classList.add('hide');
      modalAdd.classList.add('hide');
      modalSubmit.reset(); //очищение полей формы при закрытии
      document.removeEventListener('keydown', closeModalEsc); //Закрытие по клавише Escape
   };
};

addAd.addEventListener('click', () => {
   modalAdd.classList.remove('hide'); //открытие модального окна 
   modalBtnSubmit.disabled = true; // отключение кнопки при пустых полях
   document.addEventListener('keydown', closeModalEsc); //Закрытие по клавише Escape
});

catalog.addEventListener('click', event => {
   const target = event.target;

   if (target.closest('.card')) { //  определяем делигирование
      modalItem.classList.remove('hide'); // открытие при клике на карточку
      document.addEventListener('keydown', closeModalEsc); //Закрытие по клавише Escape
   };
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
