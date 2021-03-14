import {resetStyleAndInnerElement} from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form-header__input');
const photoInput = document.querySelector('.ad-form__input');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const photoPreview = document.querySelector('.ad-form__photo');
const newAvatarPreview = avatarPreview.cloneNode(true);
const newPhotoPreview = photoPreview.cloneNode(true);

const resetPreviewImages = () => {
  resetStyleAndInnerElement(avatarPreview, newAvatarPreview);
  resetStyleAndInnerElement(photoPreview, newPhotoPreview);
}

const getMatches = (file) => FILE_TYPES.some((it) => file.endsWith(it));

const getPreviewFileImage = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  if (getMatches(fileName)) {
    input.setCustomValidity('');
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.style.display = 'flex';
      preview.style.justifyContent = 'center';
      preview.style.alignItems = 'center';
      preview.style.minWidth = preview.offsetWidth + 'px';

      preview.innerHTML = '';

      const element = document.createElement('img');

      element.src = reader.result;
      element.style.maxWidth = preview.offsetWidth + 'px';
      element.style.maxHeight = preview.offsetHeight+ 'px';

      preview.appendChild(element);
    });

    reader.readAsDataURL(file);

  } else {
    input.setCustomValidity('Неверный формат');
    preview.innerHTML = '';
  }

  input.reportValidity();
}

avatarInput.addEventListener('change', () => {
  getPreviewFileImage(avatarInput, avatarPreview);
});

photoInput.addEventListener('change', () => {
  getPreviewFileImage(photoInput, photoPreview);
});

export { resetPreviewImages };
