'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const modalAdd = document.querySelector('.modal__add'),
   addAd = document.querySelector('.add__ad'),
   modalBtnSubmit = document.querySelector('.modal__btn-submit'),
   modalSubmit = document.querySelector('.modal__submit'),
   catalog = document.querySelector('.catalog'),
   modalItem = document.querySelector('.modal__item'),
   modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementsModalSubmit = [...modalSubmit.elements]
   .filter(elem => elem.tagName !== 'BUTTON'); // получаем все элементы формы кроме submit

const localDB = () => localStorage.setItem('awito', JSON.stringify(dataBase));

const checkForm = () => {
   const validForm = elementsModalSubmit.every(elem => elem.value);
   //перебираем все элементы которые есть в форме, если они заполнены every вернет true
   modalBtnSubmit.disabled = !validForm;
   modalBtnWarning.style.display = validForm ? 'none' : ''; // убираем надпись
}; //проверка формы на валидацию


const closeModal = event => {
   const target = event.target;

   if (target.closest('.modal__close') ||
      target.classList.contains('modal') ||
      event.code === 'Escape') {
      modalItem.classList.add('hide');
      modalAdd.classList.add('hide');//закрытие при клике вне модального окна
      if (modalAdd) {
         modalSubmit.reset(); //очищение полей формы при закрытии
         document.removeEventListener('keydown', closeModal); //После закрытия отключить прослушку
         checkForm();
      }
   }
};

modalSubmit.addEventListener('input', checkForm); // после заполнения полей активируется кнопака отправить и исчезает предупреждающая надпись



modalSubmit.addEventListener('submit', event => {
   event.preventDefault(); // после отправки формы страница не перезагружается
   const itemObj = {};
   for (const elem of elementsModalSubmit) {
      itemObj[elem.name] = elem.value;
   }; // перебираем все элементы модального окна
   dataBase.push(itemObj);// в ранее созданный массив добавляем наш объект
   modalSubmit.reset();
   closeModal({ target: modalAdd });
   localDB();
}); // добавляем отправку данных формы в массив

addAd.addEventListener('click', () => {
   modalAdd.classList.remove('hide'); //открытие модального окна 
   modalBtnSubmit.disabled = true; // отключение кнопки при пустых полях
   document.addEventListener('keydown', closeModal); //Закрытие по клавише Escape
});

catalog.addEventListener('click', event => {
   const target = event.target;

   if (target.closest('.card')) { //  определяем делигирование
      modalItem.classList.remove('hide'); // открытие при клике на карточку
      document.addEventListener('keydown', closeModal); //Закрытие по клавише Escape
   };
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
