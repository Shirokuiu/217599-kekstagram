'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var userComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');

var calculateRandom = function (from, to) {
  var random = Math.floor((Math.random() * (to - from + 1)) + from);
  return random;
};

var getNumbersArray = function (setNumber) {
  var numbersArray = [];
  for (var i = 1; i <= setNumber; i++) {
    numbersArray.push(i);
  }
  return numbersArray;
};

var arrayNumbers = getNumbersArray(25);

var getPictures = function (setNumber) {
  var pictures = [];
  for (var i = 0; i < setNumber; i++) {
    pictures.push({
      'url': ('photos/' + arrayNumbers[i] + '.jpg'),
      'likes': calculateRandom(15, 200),
      'comments': userComments[calculateRandom(userComments.length - userComments.length, userComments.length - 1)]
    });
  }
  return pictures;
};

var createDomElements = function (numberOfElements, container) {
  var elements = getPictures(numberOfElements);
  var elementsLength = elements.length;
  for (var i = 0; i < elementsLength; i++) {
    var createElement = pictureTemplate.cloneNode(true);
    createElement.querySelector('img').setAttribute('src', elements[i].url);
    createElement.querySelector('.picture-comments').textContent = elements[i].comments;
    createElement.querySelector('.picture-likes').textContent = elements[i].likes;
    fragment.appendChild(createElement);
  }
  container.appendChild(fragment);
  return elements;
};

createDomElements(25, picturesContainer);
/*
У меня так и не получилось добавить картинку , комментарии и лайки в открывшийся попап. Ума не приложу как это сделать. Пробовал и так и этак. Получается фиксированно передать картинку , а как связать их по кликам , хз. Ни на вебинаре про это не было сказано , ни в материалах , которые прилагались. Приложи пожалуйста решение , я его запомню и буду применять. Спасибо
*/
var onPictureClick = function (event) {
  if (event.target.tagName !== 'DIV') {
    event.preventDefault();
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', function () {
      if (event.keyCode === ENTER_KEYCODE) {
        galleryOverlay.classList.remove('hidden');
      }
    });
  }
  galleryOverlay.querySelector('.gallery-overlay-close').addEventListener('click', function () {
    galleryOverlay.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      galleryOverlay.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      galleryOverlay.classList.add('hidden');
    }
  });
};
picturesContainer.addEventListener('click', onPictureClick);
