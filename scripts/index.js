const BnGameList = document.querySelector('#banner-hero .games-cont');

//                Deixar selecionado um jogo da lista                     //
const BnGames = document.querySelectorAll('#banner-hero .games-cont img');

BnGameList.addEventListener('click', (e) => {
  const gamePointer = e.target;
  let number = 0;
  if (gamePointer.tagName == 'IMG') {
    console.log('bilada');
    gamePointer.classList.add('Active');
    ShowGame(gamePointer.id);

    for (let i = 0; i < BnGames.length; i++) {
      if (BnGames[i].id !== gamePointer.id) {
        BnGames[i].classList.remove('Active');
      }
    }
  }
});

// Mudar o jogo mostrado no banner //
const banner_text = document.querySelector('#banner-hero .heading .game-text');
const banner_items = document.querySelector('#banner-hero .game-items');
const banner = document.querySelector('#banner-hero');
const banner_bar = document.querySelector('#banner-hero .banner-bar');

function ShowGame(id) {
  const gameSelect = banner_list[id];
  banner.src = gameSelect.bg;
  banner.style.backgroundImage = `url(${gameSelect.bg})`;
  banner.className = 'B' + gameSelect.id;
  banner_bar.style.width = `${20 * gameSelect.id}%`;
  banner_text.innerHTML = `
          <h2>${gameSelect.title}</h2>
          <p>${gameSelect.text}</p>
          <button>${gameSelect.bt}</button>
    `;
  banner_items.innerHTML = `
          <img src="${gameSelect.logo}" alt="" />
          <div class="video">
            <h4>ASSISTA O TRAILER</h4>
            <div style= "background-image: url(${gameSelect.thumb});" class="video-thumb"></div>
            <div style= "background-image: url(${gameSelect.gif});"class="video-preview"></div>
            <svg
              width="61"
              height="61"
              viewBox="0 0 61 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_b_1_388)">
                <circle
                  cx="30.5"
                  cy="30.5"
                  r="25.5"
                  fill="url(#paint0_linear_1_388)"
                  fill-opacity="0.9"
                />
                <circle
                  cx="30.5"
                  cy="30.5"
                  r="28"
                  stroke="var(--primary-color)"
                  stroke-opacity="0"
                  stroke-width="5"
                />
              </g>
              <path
                d="M39.2539 30.5002L25.5524 21.7464L25.5524 39.2539L39.2539 30.5002Z"
                fill="var(--primary-color)"
              />
              <defs>
                <filter
                  id="filter0_b_1_388"
                  x="-3"
                  y="-3"
                  width="67"
                  height="67"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_1_388"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_1_388"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_1_388"
                  x1="30.5"
                  y1="5"
                  x2="46.5"
                  y2="56"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#07070A" />
                  <stop offset="1" stop-color="#0F1016" stop-opacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
    `;
}

//                      Criando cada card de game                       //

function createCardGame(game) {
  const card = document.createElement('li');

  card.innerHTML = `
          <div style= "background-image: url(${game.image});"class="game-img"></div>
          <img
            class="logo"
            src=${game.logo}
          />
          <h3 class="title">${game.name}</h3>
          <p class="category">${game.category}</p>
    `;
  card.className = 'cardGame';
  return card;
}

const GameList = document.querySelector('.productList ul');
// Colocar os cards na ul//
function listarGames(listaGames) {
  for (let i = 0; i < listaGames.length; i++) {
    const game = listaGames[i];
    //console.log(game);

    const cardMontado = createCardGame(game);

    GameList.appendChild(cardMontado);
  }
}

//Pegar os dados da lista de jogos//
const getData = async () => {
  const response = await fetch(
    'https://api.brchallenges.com/api/blizzard/games'
  );
  const data = await response.json();
  const list = data;
  listarGames(list);

  if (data.erro === 'true') {
    alert('Error ao encontrar lista de jogos');
  }

  return list;
};

getData();

//                      Menu dropdown                      //

const nav = document.querySelector('#menu');
const ddMenu = document.querySelector('#menu nav ul');
const dd = document.querySelectorAll('#menu nav ul .dd');

ddMenu.addEventListener('click', (e) => {
  const op = e.target;
  if (op.className == 'dd' || op.className == 'dd Active') {
    console.log('asds');
    op.classList.toggle('Active');

    console.log(dd);
    for (let i = 0; i < dd.length; i++) {
      if (dd[i].id !== op.id) {
        dd[i].classList.remove('Active');
      }
    }
  }
});

//            open/close menu-login                      //

function toggleMenu() {
  const loginMenu = document.querySelector('#menu .w-login');

  loginMenu.classList.toggle('open');
  document.body.classList.toggle('menu-expanded');

  loginMenu.addEventListener('click', (e) => {
    const local = e.target;
    if (local.className == 'w-login open') {
      loginMenu.classList.remove('open');
      document.body.classList.toggle('menu-expanded');
    }
  });
}

// nav mobile //

const menu = document.querySelector('.mobile-menu');
const navList = document.querySelector('nav ul');

menu.addEventListener('click', (e) => {
  navList.classList.toggle('active');
  menu.classList.toggle('open');
  document.body.classList.toggle('menu-expanded');
  window.scroll(0, 0);
});

//           mudar sistema operacional no botão              //

function downButton() {
  const button = document.querySelector('#footer .bt-download button');
  let system = navigator.userAgent;
  var SO = 'Not known';

  if (system.indexOf('Win') != -1) {
    SO = 'Windows';
  } else if (system.indexOf('Mac') != -1) {
    SO = 'MacOS';
  } else if (system.indexOf('Linux') != -1) {
    SO = 'Linux';
  }

  button.innerHTML = `
  <img src="/assets/icons/${SO}-icon.png" /> Baixar para o ${SO} 
  `;
  console.log(SO);
}

downButton();
