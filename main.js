const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}
//day1
let login=localStorage.getItem('login')
const buttonAuth=document.querySelector('.button-auth')
const closeAuth=document.querySelector('.close-auth')
const loginForm=document.querySelector('#logInForm')
const modalAuth=document.querySelector('.modal-auth')
const loginInput=document.querySelector('#login')
const userName=document.querySelector('.user-name')
const buttonOut=document.querySelector('.button-out')
const cardsRestaurants=document.querySelector('.cards-restaurants')
const containerPromo=document.querySelector('.container-promo')
const restaurants=document.querySelector('.restaurants')
const menu=document.querySelector('.menu')
const logo=document.querySelector('.logo')
const cardsMenu=document.querySelector('.cards-menu')
const getData=async function(url){
  const response=await fetch(url)
  if(!response.ok){throw new Error(`error ${url}, ${response.status}` )}
  return await response.json()
}
getData('./db/partners.json')

function toggleModalAuth(){
  modalAuth.classList.toggle('is-open')
}

function authorized(){
  function logOut(){
    login=''
    buttonAuth.style.display=''
    userName.style.display=''
    buttonOut.style.display=''
    buttonOut.removeEventListener('click',logOut)
    localStorage.removeItem('login')
    loginInput.style.backgroundColor=''
    checkAuth()
  }
  console.log('Авторизован')
  userName.textContent=login
  buttonAuth.style.display='none'
  userName.style.display='inline'
  buttonOut.style.display='block'
  buttonOut.addEventListener('click',logOut)
}
function notAuthorized(){
  console.log('Не авторизован')
  function logIn(event){
    login=loginInput.value
    localStorage.setItem('login', login)
    buttonAuth.removeEventListener('click', toggleModalAuth)
    closeAuth.removeEventListener('click', toggleModalAuth)
    loginForm.removeEventListener('submit', logIn)
    loginForm.reset()
    if (login){authorized}else{loginInput.style.backgroundColor='red';loginInput.textContent='Введите логин'}
    checkAuth()
    toggleModalAuth()
  }
  buttonAuth.addEventListener('click', toggleModalAuth)
  closeAuth.addEventListener('click', toggleModalAuth)
  loginForm.addEventListener('submit', logIn)
}
function checkAuth(){
  if (login){
  authorized();
}
else{
  notAuthorized();
  if (login){authorized}else{loginInput.style.backgroundColor='red'}
}
}
checkAuth()
//day2
function createCardRestaurant(restaurant){
  console.log(restaurant)
  const { image, name, time_of_delivery:timeOfDelivery, stars, price, kitchen, products }=restaurant
  const card=`
    <a class="card card-restaurant" data-products="${products}">
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
        </div>
        <!-- /.card-heading -->
        <div class="card-info">
          <div class="rating">
            ${stars}
          </div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
        <!-- /.card-info -->
      </div>
      <!-- /.card-text -->
    </a>`
  cardsRestaurants.insertAdjacentHTML('beforeend', card)
}
function createCardGood(goods){
  console.log(goods)
  const { id, name, description, price, image }=goods
  const card=document.createElement('div')
  card.className='card'
  card.insertAdjacentHTML('beforeend', `
          <div class="card">
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
							<!-- /.card-info -->
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
						<!-- /.card-text -->
					</div>
          <!-- /.card -->`)
          cardsMenu.insertAdjacentElement('beforeend', card)
}
function openGoods(event){
  const target=event.target
  const restaurant=target.closest('.card-restaurant')
  if (restaurants){
    containerPromo.classList.add('hide')
    restaurants.classList.add('hide')
    menu.classList.remove('hide')
    cardsMenu.textContent=''
    getData(`./db/${restaurant.dataset.products}`).then(function(data){
      data.forEach(createCardGood)
    })
  }
}

function init(){
  getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaurant)
  })
  cardsRestaurants.addEventListener('click', openGoods)
  logo.addEventListener('click', function(){
    containerPromo.classList.remove('hide')
    restaurants.classList.remove('hide')
    menu.classList.add('hide')
  })
  new Swiper('.swiper-container', {loop:true, slidePerView: 1, //autoplay:true
  })
}
init()