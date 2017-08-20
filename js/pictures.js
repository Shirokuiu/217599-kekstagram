'use strict';

var userComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');

var calculateRandom = function (from, to) {
  var random = Math.floor((Math.random() * (to - from + 1)) + from);
  return random;
};

var getPictures = function () {
  var pictures = [];
  for (var i = 0; i < 25; i++) {
    pictures.push({
      'url': ('photos/' + calculateRandom(1, 25) + '.jpg'),
      'likes': calculateRandom(15, 200),
      'comments': userComments[calculateRandom(userComments.length - userComments.length, userComments.length - 1)]
    });
  }
  return pictures;
};

for (var i = 0; i < getPictures().length; i++) {
  var createElement = pictureTemplate.cloneNode(true);
  createElement.querySelector('img').setAttribute('src', getPictures()[i].url);
  createElement.querySelector('.picture-comments').textContent = getPictures()[i].comments;
  createElement.querySelector('.picture-likes').textContent = getPictures()[i].likes;

  fragment.appendChild(createElement);
}
picturesContainer.appendChild(fragment);

galleryOverlay.classList.remove('hidden');
galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', getPictures()[0].url);
galleryOverlay.querySelector('.likes-count').textContent = getPictures()[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = getPictures()[0].comments;
