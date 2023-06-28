(function () {

  //header scroll fix
  window.addEventListener('scroll', function() {
    var curr = window.pageYOffset;
    var target = document.querySelector('.container').offsetTop;
    
    if (curr >= target) {
      document.querySelector('.gnb').classList.add('fix');
    } else {
      document.querySelector('.gnb').classList.remove('fix');
    }
  });

  
  //gnb
  fetch("./assets/data/menuData.json")
    .then((response) => response.json())
    .then((json) => {
      let data = json.items;
      let html = '';
      let idx = 0;

      data.forEach(element => {
        let pointEl = '<span class="dot"></span>';
        let isEvent = (element.point) ? pointEl : '';
        let isActive = (idx === 0) ? 'active' : '';

        html += `
          <li class="gnb-item swiper-slide">
            <a href="" class="gnb-link ${isActive}">${element.title}${isEvent}</a>
          </li>`;
        idx++;
      });

      document.getElementById('menuData').innerHTML = html;
    });

  // gnb active 클래스 부여
  document.addEventListener('click', (event) => {
    const target = event.target;
  
    if (target.classList.contains('gnb-link')) {
      event.preventDefault();
      const gnbLinks = document.querySelectorAll('.gnb-link');
      gnbLinks.forEach((link) => {
        link.classList.remove('active');
      });
      target.classList.add('active');
    }
  });
  
  // logo 옆 아래 화살표 버튼
  const mallListBtn = document.querySelector('.link-area .btn-link');
  const linkPopup = document.querySelector('.link-popup');

  mallListBtn.addEventListener('click', function() {
    linkPopup.style.display = (linkPopup.style.display === 'none' || linkPopup.style.display === '') ? 'block' : 'none';
  });

  window.addEventListener('scroll', () => {
    if (linkPopup.style.display === 'block') {
      linkPopup.style.display = 'none';
    }
  });




  //mainbanner
  fetch("./assets/data/mainBannerData.json")
    .then((response) => response.json())
    .then((json) => {
      data = json.items;

      let html = '';

      data.forEach(element => {
        html += `
          <div class="swiper-slide">
            <a href="">
              <div class="text-area">
                <i><span class="blind">${element.cate}</span></i>
                <h2 class="title">${element.title}</h2>
                <p class="subTxt">${element.desc}</p>
              </div>
              <div class="thumb-area">
                <img src="${element.thumb}" alt="${element.desc}">
              </div>
            </a>
          </div>`;
      });

      $('#bannerData1').html(html);

      //swiper
      const swiper2 = new Swiper("#banner_swiper", {
        slidesPerView: 'auto',
        spaceBetween: 5,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        centeredSlides: true,

        // pagination
        pagination: {
          el: ".page-area",
          type: "custom",
          renderCustom: function (swiper, current, total) {

            currentNum = (current < 10) ? '0' + current : current;
            totalNum = (total < 10) ? '0' + total : total;

            return `<span class="page-current">${currentNum}</span> 
              <span class="page-total">${totalNum}</span>`;
          }
        },
      });
    });


  // mainbanner 전체 보기 common popup
  const allBanner = document.getElementById('allBanner');
  const popupBg = document.querySelector('.modal-popup-wrap .popup-bg');
  const popupInner = document.querySelector('.modal-popup-wrap .popup-inner');
  const allbannerData = document.getElementById('allbannerData');

  allBanner.addEventListener('click', () => {
    popupBg.style.display = 'block';
    popupInner.classList.add('on');

    fetch("./assets/data/mainBannerData.json")
      .then((response) => response.json())
      .then((json) => {
        const data = json.items;

        let html = '';

        data.forEach(element => {
          html += `
            <li class="cont-item">
              <a href="" class="cont-link">
                <div class="thumb"><img src="${element.thumb}" alt=""></div>
                <div class="text">
                  <i><span class="blind">${element.cate}</span></i>
                  <strong class="title">${element.title}</strong>
                  <p class="subTxt">${element.desc}</p>
                </div>
              </a>
            </li>`;
        });

        allbannerData.innerHTML = html;
      });
  });

  
  //common popup close
  const closeBtns = document.querySelectorAll('.btn-close');

  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const popupBg = closeBtn.closest('.modal-popup-wrap').querySelector('.popup-bg');
      const popupInner = closeBtn.closest('.modal-popup-wrap').querySelector('.popup-inner');
  
      popupBg.style.display = 'none';
      popupInner.classList.remove('on');
    });
  });




  //quickbanner
  fetch("./assets/data/quickBannerData.json")
  .then((response) => response.json())
  .then((json) => {
    data = json.items;

    let html = '';
    data.forEach(element => {
      pointEl = 'hot';

      isEvent = (element.point) ? pointEl : '';
      html += `
        <div class="swiper-slide">
          <a href="" class="quick-link">
            <div class="thumb-area ${isEvent}">
              <img src="${element.thumb}" alt="${element.name}">
            </div>
            <span class="text-area">${element.name}</span>
          </a>
        </div>`;
    });

    $('#quickBannerData').html(html);

    //swiper
    const swiper3 = new Swiper("#quickbanner-swiper", {
      slidesPerView: 'auto',
      autoplay: false,
    });
  });





  /**
   * cate1
   * 0 복합성
   * 1 건성
   * 2 극건성
   * 3 지성
   * 4 수분부족지성
   * 5 중성
   */

  /**
   * cate2
   * 0 고민없음
   * 1 민감성
   * 2 트러블
   * 3 탄력없음
   * 4 주름
   * 5 칙칙함
   * 6 건조함
   * 7 모공
  */

  //recommend
  const skinType = document.getElementById('skinType');
  const trouble = document.getElementById('trouble');
  const popupBgSkin = document.querySelector('.sc-popup02 .popup-bg');
  const popupInnerSkin = document.querySelector('.sc-popup02 .popup-inner');
  const popupBgTrouble = document.querySelector('.sc-popup03 .popup-bg');
  const popupInnerTrouble = document.querySelector('.sc-popup03 .popup-inner');
  const popSkinItems = document.querySelectorAll('#pop_skin li');
  const popTroubleItems = document.querySelectorAll('#pop_trouble li');
  const sortDataContainer = document.getElementById('sortData');

  skinType.addEventListener('click', () => {
    popupBgSkin.style.display = 'block';
    popupInnerSkin.classList.add('on');
  });

  trouble.addEventListener('click', () => {
    popupBgTrouble.style.display = 'block';
    popupInnerTrouble.classList.add('on');
  });

  popSkinItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.add('active');
      const siblings = Array.from(item.parentNode.children).filter(el => el !== item);
      siblings.forEach(sibling => sibling.classList.remove('active'));
      skinType.textContent = item.textContent;
      popupBgSkin.style.display = 'none';
      popupInnerSkin.classList.remove('on');

      const cate1 = item.dataset.cate1;
      const cate2 = item.dataset.cate2;
      sortData(cate1, cate2);
    });
  });

  popTroubleItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.add('active');
      const siblings = Array.from(item.parentNode.children).filter(el => el !== item);
      siblings.forEach(sibling => sibling.classList.remove('active'));
      trouble.textContent = item.textContent;
      popupBgTrouble.style.display = 'none';
      popupInnerTrouble.classList.remove('on');

      const cate1 = item.dataset.cate1;
      const cate2 = item.dataset.cate2;
      sortData(cate1, cate2);
    });
  });

  //첫 페이지에 보여줄 데이터
  sortFirst(0, 2);

  function sortFirst(a, b) {
    sortData(a, b);
    popSkinItems[a].classList.add('active');
    const skinSiblings = Array.from(popSkinItems[a].parentNode.children).filter(el => el !== popSkinItems[a]);
    skinSiblings.forEach(sibling => sibling.classList.remove('active'));
    popTroubleItems[b].classList.add('active');
    const troubleSiblings = Array.from(popTroubleItems[b].parentNode.children).filter(el => el !== popTroubleItems[b]);
    troubleSiblings.forEach(sibling => sibling.classList.remove('active'));
  }

  function sortData(cate1, cate2) {
    fetch("./assets/data/prdData.json")
      .then((response) => response.json())
      .then((json) => {
        const data = json.items;

        const result = data.filter((parm) => parm.cate1 == cate1 || parm.cate2 == cate2);

        let html = '';
        result.forEach(element => {
          const saleEl = (element.price.ori === element.price.curr) ? 'hide' : '';

          html += `
            <div class="swiper-slide">
              <div class="product-inner">
                <a href="">
                  <div class="pro-thumb-area">
                    <img src="${element.thumb}" alt="${element.name}">
                  </div>
                  <div class="pro-text-area">
                    <div class="pro-title">
                      <strong class="brand">${element.brand}</strong>
                      <span class="name">${element.name}</span>
                    </div>
                    <div class="pro-price">
                      <span class="del-price ${saleEl}">${price(element.price.ori)}</span>
                      <em class="discount-rate ${saleEl}">${salepercent(element.price.ori, element.price.curr)}%</em>
                      <span class="price"><strong class="size_16">${price(element.price.curr)}</strong>원</span>
                    </div>
                    <div class="pro-hashtag">
                      <span class="hashtag-inner">${element.hashtag}</span>
                    </div>
                  </div>
                </a>
                <button class="pro-like"><span class="blind">좋아요</span></button>
              </div>
            </div>`;
        });
        sortDataContainer.innerHTML = html;

        //swiper
        const swiper4 = new Swiper("#recom-swiper", {
          slidesPerView: 'auto',
          spaceBetween: 0,
          autoplay: false,
        });
      });
  }


  // 천단위 콤마(정규식)
  function price(p) {
    return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  //할인율 함수
  function salepercent(ori, curr) {
    return (ori - curr) / ori * 100;
  }
  


  //new swiper
  const swiper5 = new Swiper("#new-swiper", {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 8,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });




  //associate - advice
  fetch("./assets/data/prdData.json")
    .then((response) => response.json())
    .then((json) => {
      data = json.items;

      let html = '';

      data.forEach(element => {

        benefitHtml = '';
        element.benefit.forEach(benefitEl => {
          benefitHtml += `<span>${benefitEl}</span>`;
        });

        const saleEl = (element.price.ori === element.price.curr) ? 'hide' : '';

        html += `
          <div class="swiper-slide">
            <div class="product-inner">
              <a href="">
                <div class="pro-thumb-area">
                  <img src="${element.thumb}" alt="${element.name}" />
                </div>
                <div class="pro-text-area">
                  <div class="pro-title">
                    <strong class="brand">${element.brand}</strong>
                    <span class="name">${element.name}</span>
                  </div>
                  <div class="pro-price">
                    <span class="del-price ${saleEl}">${price(element.price.ori)}</span>
                    <em class="discount-rate ${saleEl}">${salepercent(element.price.ori, element.price.curr)}%</em>
                    <span class="price"><strong class="size_16">${price(element.price.curr)}</strong>원</span>
                  </div>
                  <div class="pro-rate">
                    <span class="icon-star">
                      <span>${element.rate}</span>
                      <span>${element.review}</span>
                    </span>
                  </div>
                  <div class="pro-gift">${benefitHtml}</div>
                </div>
              </a>
              <button class="pro-like"><span class="blind">좋아요</span></button>
            </div>
          </div>`;
      });

      $('#adviceData').html(html);

      //swiper
      const swiper6 = new Swiper("#advice-swiper", {
        slidesPerView: 'auto',
        autoplay: false,
      });
    });


  
    
  //sale
  //탭 메뉴
  const tabBtns = Array.from(document.querySelectorAll(".sale-btn > div"));
  const tabConts = Array.from(document.querySelectorAll(".sale-contents > div"));

  tabConts.forEach((tabCont, index) => {
    if (index !== 0) {
      tabCont.style.display = "none";
    }
  });

  tabBtns.forEach((tabBtn, index) => {
    tabBtn.addEventListener("click", function (e) {
      e.preventDefault();

      tabConts.forEach((tabCont) => {
        tabCont.style.display = "none";
      });

      tabConts[index].style.display = "block";

      tabBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");

      const sale1 = this.dataset.sale1;
      saleData(sale1);
    });
  });

  saleData(0); //첫 페이지에서 보이도록

  function saleData(sale1) {
    fetch("./assets/data/prdData.json")
      .then((response) => response.json())
      .then((json) => {
        const data = json.items;
        let html = "";

        const result2 = data.filter((parm) => parm.sale1 == sale1);

        result2.forEach((element) => {
          html += `
            <div class="swiper-slide">
              <div class="product-inner">
                <a href="">
                  <div class="pro-thumb-area">
                    <img src="${element.saleThumb}" alt="">
                  </div>
                  <div class="pro-text-area">
                    <div class="pro-title">
                      <strong class="brand">${element.brand}</strong>
                      <span class="name">${element.name}</span>
                    </div>
                    <div class="pro-price">
                      <em class="discount-rate">${salepercent(element.price.ori, element.price.curr)}%</em>
                      <span class="price"><strong class="size_16">${element.price.curr}</strong>원</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>`;
        });

        const saleDataContainers = document.querySelectorAll('#saleData1, #saleData2, #saleData3, #saleData4, #saleData5');
        saleDataContainers.forEach((container) => {
          container.innerHTML = html;
        });

        const swipers = Array.from(document.querySelectorAll(".sale-swiper"));
        swipers.forEach((swiper) => {
          new Swiper(swiper, {
            slidesPerView: 'auto',
            autoplay: false,
          });
        });
      });
  }




  //event swiper
  const swiper8 = new Swiper("#event-swiper", {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 8,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });




  //best
  const popPeriodItems = document.querySelectorAll('#pop_period li');

  popPeriodItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.add('active');
      const siblings = Array.from(item.parentNode.children).filter((el) => el !== item);
      siblings.forEach((sibling) => {
        sibling.classList.remove('active');
      });
      document.querySelector('.btn-date').textContent = item.textContent;
      document.querySelector('.sc-popup04 .popup-bg').style.display = 'none';
      document.querySelector('.sc-popup04 .popup-inner').classList.remove('on');

      const cate3 = document.querySelector('#pop_period .active').dataset.cate3;

      bestData(cate3);
    });
  });

  bestData(0);

  function bestData(cate3) {
    fetch('./assets/data/prdData.json')
      .then((response) => response.json())
      .then((json) => {
        const data = json.items;
        let html = '';

        const result3 = data.filter((parm) => parm.cate3 == cate3);

        result3.forEach((element) => {
          let benefitHtml = '';
          element.benefit.forEach((benefitEl) => {
            benefitHtml += `<span>${benefitEl}</span>`;
          });

          const saleEl = element.price.ori === element.price.curr ? 'hide' : '';

          html += `
            <div class="swiper-slide">
              <div class="product-inner">
                <a href="" class="position">
                  <div class="pro-thumb-area">
                    <img src="${element.thumb}" alt="${element.name}">
                  </div>
                  <div class="pro-like"><span class="blind">좋아요</span></div>
                </a>
                <a href="">
                  <div class="pro-text-area">
                    <div class="pro-title">
                      <strong class="brand">${element.brand}</strong>
                      <span class="name">${element.name}</span>
                    </div>
                    <div class="pro-price">
                      <span class="del-price ${saleEl}">${price(element.price.ori)}</span>
                      <em class="discount-rate ${saleEl}">${salepercent(element.price.ori,element.price.curr)}%</em>
                      <span class="price"><strong class="size_16">${price(element.price.curr)}</strong>원</span>
                    </div>
                    <div class="pro-rate">
                      <span class="icon-star">
                        <span>${element.rate}</span>
                        <span>${element.review}</span>
                      </span>
                    </div>
                    <div class="pro-gift">${benefitHtml}</div>
                  </div>
                </a>
              </div>
            </div>`;
        });

        document.querySelector('#bestData').innerHTML = html;
      });
  }

  //best 조회 팝업
  document.querySelector('.btn-date').addEventListener('click', function () {
    document.querySelector('.sc-popup04 .popup-bg').style.display = 'block';
    document.querySelector('.sc-popup04 .popup-inner').classList.add('on');
  });




  //scrollTop
  document.getElementById("topBtn").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  });
  
  


  //footer 공지사항 swiper
  const swiper9 = new Swiper("#footer-swiper", {
    direction: 'vertical',
    autoplay: true,
    loop: true
  });
})();