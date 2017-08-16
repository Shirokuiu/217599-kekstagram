'use strict';

var pictures = [];
var userComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');

var calculateRandom = function (from, to) {
  var random = Math.floor((Math.random() * (to - from + 1)) + from);
  return random;
};

var addData = function () {
  var pushPictures = pictures;
  for (var i = 0; i < 25; i++) {
    pushPictures.push({
      'url': ('photos/' + calculateRandom(1, 25) + '.jpg'),
      'likes': calculateRandom(15, 200),
      'comments': userComments[calculateRandom(userComments.length - userComments.length, userComments.length - 1)]
    });
  }
  return pushPictures;
};

var createDomElements = function (container) {
  for (var i = 0; i < pictures.length; i++) {
    var createElement = pictureTemplate.cloneNode(true);
    createElement.querySelector('img').setAttribute('src', pictures[i].url);
    createElement.querySelector('.picture-comments').textContent = pictures[i].comments;
    createElement.querySelector('.picture-likes').textContent = pictures[i].likes;

    fragment.appendChild(createElement);
  }
  return container.appendChild(fragment);
};

addData();
createDomElements(picturesContainer);
galleryOverlay.classList.remove('hidden');
galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', pictures[0].url);
galleryOverlay.querySelector('.likes-count').textContent = pictures[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = pictures[0].comments;
