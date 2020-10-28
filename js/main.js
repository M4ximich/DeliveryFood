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
  if (login){authorized}else{loginInput.style.backgroundColor=rgb(0,0,0)}
}
}
checkAuth()
//day2
function createCardRestaurant(){
  const card=`
    <a href="restaurant.html" class="card card-restaurant">
      <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Тануки</h3>
          <span class="card-tag tag">60 мин</span>
        </div>
        <!-- /.card-heading -->
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 1 200 ₽</div>
          <div class="category">Суши, роллы</div>
        </div>
        <!-- /.card-info -->
      </div>
      <!-- /.card-text -->
    </a>`
  cardsRestaurants.insertAdjacentHTML('afterend', card)
}
createCardRestaurant();
createCardRestaurant()
createCardRestaurant()