'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const modalAdd = document.querySelector('.modal__add'),
   addAd = document.querySelector('.add__ad'),
   modalBtnSubmit = document.querySelector('.modal__btn-submit'),
   modalSubmit = document.querySelector('.modal__submit'),
   catalog = document.querySelector('.catalog'),
   modalItem = document.querySelector('.modal__item'),
   modalBtnWarning = document.querySelector('.modal__btn-warning'),
   modalFileInput = document.querySelector('.modal__file-input'),
   modalFileBtn = document.querySelector('.modal__file-btn'),
   modalImageAdd = document.querySelector('.modal__image-add');

const modalImageItem = document.querySelector('.modal__image-item'),
   modalHeaderItem = document.querySelector('.modal__header-item'),
   modalStatusItem = document.querySelector('.modal__status-item'),
   modalCostItem = document.querySelector('.modal__cost-item'),
   modalDesriptionItem = document.querySelector('.modal__description-item');



const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;


const elementsModalSubmit = [...modalSubmit.elements]
   .filter(elem => elem.tagName !== 'BUTTON'); // получаем все элементы формы кроме submit

const infoPhoto = {};

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
         modalImageAdd.src = srcModalImage;
         modalFileBtn.textContent = textFileBtn;
         checkForm();
         modalItem.textContent = '';
      }

   }
};

const renderCard = () => { //добавление карточек
   catalog.textContent = '';

   dataBase.forEach((item, i) => {
      catalog.insertAdjacentHTML('beforeend', `
         <li class="card data-id=${i}">
            <img class="card__image" src="data:image/jpeg;base64,${infoPhoto.base64}" alt="image">
            <div class="card__description">
               <h3 class="card__header">${item.nameItem}</h3>
               <div class="card__price">${item.costItem}</div>
            </div>
         </li>
      `)
   });
};

modalFileInput.addEventListener('change', event => {
   const target = event.target;

   const reader = new FileReader();

   const file = target.files[0];

   infoPhoto.filename = file.name;
   infoPhoto.size = file.size;

   reader.readAsBinaryString(file);

   reader.addEventListener('load', event => {
      if (infoPhoto.size < 200000) {
         modalFileBtn.textContent = infoPhoto.filename;
         infoPhoto.base64 = btoa(event.target.result);
         modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
      } else {
         modalFileBtn.textContent = 'Файл не должен превышать 200 kB';
         modalFileInput.value = '';
         modalImageAdd.src = srcModalImage;
         checkForm();
      }
   });
});

modalSubmit.addEventListener('input', checkForm); // после заполнения полей активируется кнопака отправить и исчезает предупреждающая надпись

modalSubmit.addEventListener('submit', event => {
   event.preventDefault(); // после отправки формы страница не перезагружается
   const itemObj = {};
   for (const elem of elementsModalSubmit) {
      itemObj[elem.name] = elem.value;
   }; // перебираем все элементы модального окна

   itemObj.image = infoPhoto.base64;
   dataBase.push(itemObj);// в ранее созданный массив добавляем наш объект
   modalSubmit.reset();
   closeModal({ target: modalAdd });
   localDB();
   renderCard();

}); // добавляем отправку данных формы в массив

addAd.addEventListener('click', () => {
   modalAdd.classList.remove('hide'); //открытие модального окна 
   modalBtnSubmit.disabled = true; // отключение кнопки при пустых полях
   document.addEventListener('keydown', closeModal); //Закрытие по клавише Escape
});

catalog.addEventListener('click', event => {
   const target = event.target;
   const card = target.closest('.card');

   if (card) {
      // const item = dataBase[card.dataset.id];

      /*modalImageItem.src = `data: image/jpeg;base64,${item.image}`;
       modalHeaderItem.textContent =
          modalStatusItem =
          modalCostItem =
          modalDesriptionItem =
 */
      modalItem.classList.remove('hide'); // открытие при клике на карточку
      document.addEventListener('keydown', closeModal); //Закрытие по клавише Escape
   };
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

renderCard();