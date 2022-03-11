var brandData = [
  { name: "Boat", img: "https://www.jaiswaltrading.company/imgs/boat.webp", meta: "", color: "#FFFFFF" },
  {
    name: "Infinix",
    img: "https://www.jaiswaltrading.company/imgs/infinix.jpg",
    meta: "",
    color: "#76AF00",
  },
  {
    name: "Itel",
    img: "https://www.jaiswaltrading.company/imgs/itel.jpg",
    meta: "",
    color: "#FE0000",
  },
  {
   name: "Realme",
   img: "https://www.jaiswaltrading.company/imgs/realme.png",
   meta: "Royal Club Member",
   color: "#FFC915",
 },
 {
   name: "Xiaomi",
   img: "https://www.jaiswaltrading.company/imgs/xiaomi.png",
   meta: "Platinum Partner",
   color: "#FF6700",
 },
  {
    name: "Lava",
    img: "https://www.jaiswaltrading.company/imgs/lava.jpg",
    meta: "",
    color: "#EC1656",
  },
  {
    name: "Nokia",
    img: "https://www.jaiswaltrading.company/imgs/nokia.jpg",
    meta: "",
    color: "#014A99",
  },
  {
    name: "One Plus",
    img: "https://www.jaiswaltrading.company/imgs/oneplus.png",
    meta: "",
    color: "#F62414",
  },
  
  {
    name: "Techno",
    img: "https://www.jaiswaltrading.company/imgs/techno.jpg",
    color: "#0076B4",
    meta: "",
  },
];

function Queue(ls) {
  this.ls = ls;
  this.forward = function () {
    let data = this.ls.pop();
    this.ls = [data].concat(this.ls);
  };

  

  this.backward = function () {
    let data = this.ls.shift();
    this.ls.push(data);
  };

  this.get = function (index) {
    return this.ls[index];
  };
  this.length = this.ls.length;
}

var queue = new Queue(brandData);

var elemArray = []

var currentFocusBrandIndex = 4;
var leftBrandIndex = 3;
var rightBrandIndex = 5;

var slideMovementData = {};

function getEvent(e) {
  return e.changedTouch ? e.changedTouch[0] : e;
}

function lockSlide(e) {
  e.preventDefault();
  e = getEvent(e);
  slideMovementData.x = e.clientX;
}
function moveSlide(e) {
  e.preventDefault();
  e = getEvent(e);
  if (slideMovementData.x || slideMovementData.x === 0) {
    let dx = e.clientX - slideMovementData.x;
    if (dx > 0) {
      //Swipe Right -->
      queue.forward();
    } else if (dx < 0) {
      //Swipe Left <--
      queue.backward();
    }
    createSlider();
  }
}

function moveRight(e){
   queue.forward()
   createSlider()
}

function moveLeft(e){
   queue.backward()
   createSlider()
}




function swipeController(el) {
  el.addEventListener("mousedown", lockSlide, false);
  el.addEventListener("touchdown", lockSlide, false);
  el.addEventListener("mouseup", moveSlide, false);
  el.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    false
  );
  el.addEventListener("touchup", moveSlide, false);
}

function createSubCard(index) {
  let meta = queue.get(index);
  

  let cardBox = document.createElement("div");
  cardBox.classList.add(
    "w-96",
    "filter",
    "drop-shadow-md",
    "disable-pointer",
    "mt-8",
    "mx-6",
    "h-3/4",
    "rounded-lg",
    "flex",
    "flex-col",
    "justify-center",
  );
  cardBox.style.setProperty("background-color", meta.color);

  let image = document.createElement("img");
  image.classList.add("w-full");
  image.src = meta.img;
  cardBox.appendChild(image);

  // if (index === leftBrandIndex || index == leftBrandIndex - 1) {
  //   cardBox.classList.add("persp-left");
  // } else if (index === rightBrandIndex || index == rightBrandIndex + 1) {
  //   cardBox.classList.add("persp-right");
  // }else 
  if(index === currentFocusBrandIndex){
   let name = document.querySelector('#name')
   let elmeta = document.querySelector('#meta')
   name.innerText = meta.name
   elmeta.innerText = meta.meta
  }

  return cardBox;
}

function createDesktopSlider() {
  let slider = document.querySelector(".slider");
  slider.innerHTML = "";

  for (let i = 0; i < queue.length; i++) {
    elemArray[i] = createSubCard(i)
    slider.appendChild(elemArray[i]);
  }
}




function createMobileSlider() {
  let slider = document.querySelector(".slider");
  slider.innerHTML = "";
}

function createSlider() {
  
    createDesktopSlider();
  
}

// function jumpTo(id) {
//   // console.log(id);
//   let nameIntro = document.getElementById("name-intro");
//   let boudRect = nameIntro.getBoundingClientRect();
//   const { height, top } = boudRect;
//   document.getElementById(id).style.setProperty("top", top + "px");
// }

function init() {
  let secondPage = document.getElementById('second-page')
  let thirdPage = document.getElementById('third-page')
  let scrollController = new ScrollController(document.body, secondPage, thirdPage)
  scrollController.init()
  swipeController(document.querySelector(".slider"))
  onResize()
  window.onresize = function (e) {
    onResize()
    // createSlider();
  };

  document.querySelector('.arrow-left').addEventListener("click", moveLeft, false)
  document.querySelector('.arrow-right').addEventListener("click", moveRight, false)
}

init();



function ScrollController(el, secondPage, thirdPage){
  this.el = el
  this.secondPage = secondPage
  this.thirdPage = thirdPage
  this.initTop;
  this.bgImg;

  this.init = function(){
    this.secondPage.style.setProperty("top","100vh")
    this.thirdPage.style.setProperty("top","200vh")
    this.thirdPage.style.setProperty("height", "120vh")
    this.initTop = this.getTop(this.secondPage)
    this.bgImg = document.getElementById('bg-img')
    let self = this
    this.el.addEventListener("wheel", function(e){
      // e.preventDefault()
      self.scroll(e)
    }, false)
  }

  this.getTop = function(el){
    return el.getBoundingClientRect().top
  }

  this.updateTop  = function(dy){
    this.secondPage.style.setProperty('top', (this.getTop(this.secondPage) - dy) + "px")
    this.thirdPage.style.setProperty('top', (this.getTop(this.thirdPage) - dy) + "px")
  }

  this.hook = function(){
  }


  this.scroll = function(e){
    if(e.deltaY > 0 && this.getTop(this.thirdPage) > 0){
      this.updateTop(e.deltaY)
      this.hook()
    }else if(e.deltaY < 0  && this.getTop(this.secondPage) < this.initTop){
      this.updateTop(e.deltaY)
      this.hook()
    }
  }
}


function mountEmailBox(){
  let el = document.getElementById("email-box")
  if(window.innerWidth < 1920){
    el.style.setProperty("background-color", "black")
    el.innerHTML = `<img class="w-6 h-6" src="https://www.jaiswaltrading.company/svgs/email.svg" />
    <p class="ml-4 text-white text-lato text-xl">Email</p`
  }else{
    el.style.setProperty("background-color", "white")
    el.innerHTML = `<img class="w-8 h-8" src="https://www.jaiswaltrading.company/svgs/email-icon.svg" />
    <p class="ml-2 lg:ml-4 text-lato text-xs lg:text-xl">business@jaiswaltrading.company</p>`
  }
  el.onclick = function(){
    window.location.href = "mailto:business@jaiswaltrading.company"
  }
}


function mountBgImage(){
  let largeImage = "https://www.jaiswaltrading.company/imgs/wallps/1186214.jpg"
  let smallImage = "https://www.jaiswaltrading.company/imgs/wallps/phone.jpg"
  let el = document.getElementById('bg-img')
  if(window.screen.width > 1024){
    el.src = largeImage
  }else{
    el.src = smallImage
  }
}


function onResize() {
  mountBgImage()
  createSlider()
  mountEmailBox()

}


window.addEventListener('message', function(event){
  console.log(event)

  event.source.postMessage("incubator metrocks")
})