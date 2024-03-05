/*=======$$//Start Option//$$=======*/
//check there`s color in local storage.
if (localStorage.getItem("color_option") !== null) {
  //add color to root css.
  document.documentElement.style.setProperty(
    `--main-color`,
    localStorage.getItem("color_option")
  );
  document.querySelectorAll(`.colors li`).forEach((li) => {
    //Remove active class from all li
    li.classList.remove(`active`);
    //Add active class to li of localStorage color.
    if (li.dataset.color === localStorage.getItem("color_option")) {
      li.classList.add(`active`);
    }
  });
}

/*=====Open the option=====*/
let Option = document.querySelector(`.option`);

let icon = document.querySelector(`.option .icon i`);
icon.onclick = function () {
  this.classList.toggle(`fa-spin`);
  Option.classList.toggle(`open`);
};

/*=====Change Color=====*/
let colorsLi = document.querySelectorAll(`.colors li`);
//Loop on All li colors

colorsLi.forEach((li) => {
  li.onclick = function (e) {
    HandleActiveClass(e);
    //set color to property root
    document.documentElement.style.setProperty(
      `--main-color`,
      e.target.dataset.color
    );
    //set color to local storage
    localStorage.setItem(`color_option`, e.target.dataset.color);
  };
});

/*=====Background Option=====*/
let backgroundimgs = true;
let backgroundInterval;

if (localStorage.getItem("background_Option") !== null) {
  if (localStorage.getItem("background_Option") === "true") {
    backgroundimgs = true;
  } else {
    backgroundimgs = false;
  }
  document.querySelectorAll(`.random-background span`).forEach((span) => {
    span.classList.remove(`active`);
  });

  if (localStorage.getItem("background_Option") === "true") {
    document.querySelector(`.random-background .Yes`).classList.add(`active`);
  } else {
    document.querySelector(`.random-background .No`).classList.add(`active`);
  }
}
let backgroundOption = document.querySelectorAll(`.random-background span`);
backgroundOption.forEach((span) => {
  span.addEventListener("click", function (e) {
    HandleActiveClass(e);
    if (e.target.dataset.background === "Yes") {
      backgroundimgs = true;
      backgroundInter();
      localStorage.setItem("background_Option", true);
    } else {
      backgroundimgs = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_Option", false);
    }
  });
});

/*=====Bullets Option=====*/
let bulletButtons = document.querySelectorAll(`.show-bullets span`);
bulletButtons.forEach((button) => {
  button.addEventListener(`click`, function (e) {
    HandleActiveClass(e);
    document.querySelector(`.nav`).style.display = e.target.dataset.bullet;
    localStorage.setItem(`bullet_option`, e.target.dataset.bullet);
  });
});
if (localStorage.getItem(`bullet_option`) !== null) {
  document.querySelector(`.nav`).style.display =
    localStorage.getItem(`bullet_option`);
  bulletButtons.forEach((button) => {
    button.classList.remove(`active`);
    if (button.dataset.bullet === localStorage.getItem(`bullet_option`)) {
      button.classList.add(`active`);
    }
  });
}

function HandleActiveClass(eventElement) {
  eventElement.target.parentElement
    .querySelectorAll(`.active`)
    .forEach((element) => {
      //Remove active class from all li
      element.classList.remove(`active`);
    });
  //Add active class to target element
  eventElement.target.classList.add(`active`);
}

/*=====Reset Option=====*/
document.querySelector(`.reset-option`).onclick = function () {
  //Clear all Item of local Storage
  localStorage.clear();
  //Reload Window
  window.location.reload();
};
/*=======$$//End Option//$$=======*/
/*=======$$//Start Nav Bullets And Header Linkes//$$=======*/
//Select All Bullets
let bullets = document.querySelectorAll(`.nav li`);
//Select All Header Links
let linkes = document.querySelectorAll(`header ul li`);
function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener(`click`, function (e) {
      e.preventDefault();
      let sec = document.querySelector(e.target.dataset.scroll);
      /*=====طريقة أولى=====*/
      sec.scrollIntoView({
        behavior: "smooth",
      });
      /*=====طريقة ثانية=====*/
      // window.scrollTo({
      //     top: sec.offsetTop,
      //     behavior: "smooth",
      // });
    });
  });
}
scrollToSection(linkes);
scrollToSection(bullets);
/*=======$$//End Nav Bullets And Header Linkes//$$=======*/

/*=======$$//Statr Landing Section//$$=======*/
/*Random Background*/

let arrImgs = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
];
let landingPage = document.querySelector(".landing");

function backgroundInter() {
  if (backgroundimgs) {
    backgroundInterval = setInterval(function () {
      let randomImg = Math.floor(Math.random() * arrImgs.length);
      landingPage.style.backgroundImage =
        'url("imgs/' + arrImgs[randomImg] + '")';
    }, 5000);
  }
}
backgroundInter();

/*Toggle Links Of Header*/
let tog_links = document.querySelector(`.toggle-links`);
let tog_menu = document.querySelector(`header .container .links`);

tog_links.onclick = function (e) {
  // Stop Propagation on toggle button
  e.stopPropagation();

  tog_menu.classList.toggle(`menu-active`);
  this.classList.toggle(`menu-active`);
};

document.addEventListener(`click`, function (e) {
  // console.log(e.target);
  if (e.target !== tog_links) {
    if (tog_menu.classList.contains(`menu-active`)) {
      // console.log(`this is not menu and toggle`);
      tog_menu.classList.toggle(`menu-active`);
      tog_links.classList.toggle(`menu-active`);
    }
  }
});
/*=======$$//End Landing Section//$$=======*/

/*=======$$//Start Skills Section//$$=======*/
let skillsDetay = [
  { head: `HTML`, data_rate: `90%` },
  { head: `CSS`, data_rate: `85%` },
  { head: `JavaScript`, data_rate: `75%` },
  { head: `Python`, data_rate: `85%` },
  { head: `PHP`, data_rate: `65%` },
  { head: `MySQL`, data_rate: `90%` },
];

let skills_section = document.querySelector(".skills .container");
for (let i = 0; i < skillsDetay.length; i++) {
  skills_section.innerHTML += `
  <div class="skill-box">
    <h3>${skillsDetay[i].head}</h3>
    <div class="progress">
      <span data-rate="${skillsDetay[i].data_rate}"></span>
    </div>
  </div>
  `;
}

let skills = document.querySelectorAll(".progress span");
window.addEventListener("scroll", () => {
  if (window.scrollY >= skills_section.offsetTop - 200) {
    skills.forEach((span) => {
      span.style.width = span.dataset.rate;
    });
  }
});
/*=======$$//End Skills Section//$$=======*/

/*=======$$//Start Gallery Section//$$=======*/
let galleryimgs = document.querySelectorAll(`.gallery .container img`);
galleryimgs.forEach((img) => {
  img.onclick = function () {
    let popup = document.createElement(`div`);
    let popup_h3 = document.createElement(`h3`);
    let popup_img = document.createElement(`img`);
    let popup_close = document.createElement(`span`);
    let popup_overly = document.createElement(`div`);
    popup.className = `popup`;
    popup_close.className = `close`;
    popup_overly.className = `popup-overlay`;
    popup_h3.innerHTML = this.getAttribute(`alt`);
    popup_img.src = this.getAttribute(`src`);
    popup_close.innerHTML = `X`;
    popup.appendChild(popup_h3);
    popup.appendChild(popup_img);
    popup.appendChild(popup_close);
    document.body.appendChild(popup);
    document.body.appendChild(popup_overly);
    popup_close.onclick = function () {
      document.body.removeChild(popup);
      document.body.removeChild(popup_overly);
    };
  };
});
/*=======$$//End Gallery Section//$$=======*/

/*=======$$//Start Timeline Section//$$=======*/
let Timeline = document.querySelectorAll(
  `.timeline .container .timeline-content div .content`
);
Timeline.forEach((cont) => {
  cont.innerHTML = `
  <h2>Testing Heading</h2>
  <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
    nam, atque iure nihil, maxime dicta debitis fuga laboriosam
    impedit repudiandae dolorem rerum animi quo suscipit laborum
    veniam quas, itaque vero.
  </p>
  `;
});

/*=======$$//End Timeline Section//$$=======*/

/*=======$$//Start Our Features Section//$$=======*/
let our_features = document.querySelector(`.our-features .container`);
let featuresDetay = [
  { img: `programming`, head: `Development` },
  { img: `advertising`, head: `Marketing` },
  { img: `hosting-icon`, head: `Hosting` },
  { img: `mobile-app`, head: `Mobile Develope` },
  { img: `graphic-design`, head: `Cloud and Servers` },
  { img: `web-design`, head: `Seo` },
];
for (let i = 0; i < 6; i++) {
  our_features.innerHTML += `
  <div class="featuer-box">
    <img src="imgs/${featuresDetay[i].img}.svg" alt="" />
    <h3>${featuresDetay[i].head}</h3>
    <p>
      We are professional marketeers, we will do anything you imagine in
      no time.
    </p>
  </div>
  `;
}
let clear = document.createElement(`div`);
clear.classList = `clear-fix`;
our_features.appendChild(clear);
/*=======$$//End Our Features Section//$$=======*/

/*=======$$//Start Testimonials Section//$$=======*/
let testimonials = document.querySelectorAll(
  `.testimonials .container .testimonials-box`
);

let testimonialsDetay = [
  { img: `DDD`, head: `Ahmed Mosaad` },
  { img: `EEE`, head: `Mohamed Ibrahim` },
  { img: `DDD`, head: `Sherief Ashraf` },
];

let index = 0;
testimonials.forEach((box) => {
  box.innerHTML += `
    <p>
    Iam very happy with the product its amazing and i recieve it very
    fast and the price was amazing.
    </p>
    <div class="info">
    <img src="https://placehold.it/80/${testimonialsDetay[index].img}" alt="" />
    <div class="text">
    <h3>${testimonialsDetay[index].head}</h3>
    <span>CEO At Company</span>
    </div>
    </div>
    `;
  index++;
});
/*=======$$//END Testimonials Section//$$=======*/
