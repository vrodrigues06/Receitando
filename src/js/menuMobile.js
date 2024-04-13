import outsideEvent from './outsideEvent.js';

function initMenuMobile() {
  const menuButton = document.querySelector('#btn-mobile');
  const menuList = document.querySelector('.nav__list');
  const itemMenu = document.querySelectorAll('.header-menu li');

  const events = ['click', 'touchstart'];

  function openMenu(e) {
    e.preventDefault();
    menuList.classList.add('ativo');
    menuButton.classList.add('ativo');
    outsideEvent(menuList, events, () => {
      menuList.classList.remove('ativo');
      menuButton.classList.remove('ativo');
      menuList.classList.add('closing');
      menuButton.classList.add('closing');
      menuList.addEventListener(
        'animationend',
        () => {
          menuList.classList.remove('closing');
          menuButton.classList.remove('closing');
        },
        { once: true }
      );
    });
  }

  events.forEach(userEvent => {
    menuButton.addEventListener(userEvent, openMenu);
  });
}

initMenuMobile();
