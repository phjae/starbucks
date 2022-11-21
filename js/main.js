const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder','통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder','');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기
    //애니메이션 라이브러리 gsap to(요소, 지속시간, 옵션(객체대이터))
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    //버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300)); 
// _.throttle(함수, 시간))
// scrollY: 스크롤 될 때 마다 해당 값 갱신. 그래서 현재 화면이 몇 px  지점에 있는지 확인 가능//

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});

const fadeInEls = document.querySelectorAll('.visual .fade-in');
fadeInEls.forEach(function (fadeInEl, index){
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeInEl, 1, {
      delay: (index +1) *.7,
      opacity: 1
    });
});

new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
});

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  autoplay: {
    delay: 5000
  },
  loop: true,

  pagination: {
    el: '.promotion .swiper-pagination',
    clickable: true
  },

  navigation: {
    nextEl: '.promotion .swiper-next',
    prevEl: '.promotion .swiper-prev'
  }
});

new Swiper('.awards .swiper-container', {
  slidesPerView: 5,
  spaceBetween: 30,
  autoplay: true,
  loop: true,

  navigation: {
    nextEl: '.awards .swiper-next',
    prevEl: '.awards .swiper-prev'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.notice .toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion //!변수의 값에 반대값을 집어 넣어라 false 이면 true 가 됨 
  if (isHidePromotion) {
    //숨김처리
    promotionEl.classList.add('hide');
  } else {
    //보임처리
    promotionEl.classList.remove('hide');
  }
});

//범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  //tofixed() 통해 반환된 문자 데이터를,
  //parsefloat() 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (min - max) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  gsap.to(selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
      y: size,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 15);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소
      triggerHook: .8 //viewport 기준 맨 위가 0 아래가 1
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //올해 년도 반환