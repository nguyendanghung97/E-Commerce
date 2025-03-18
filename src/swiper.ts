// import {animationSlide} from "./gasp.ts";
export const setupSwiper = () => {
  const defaultSetting = {
    // loop: true,
    // autoHeight: true,
    // centeredSlides: true,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    
    // pagination: {
    //   el: '.swiper-pagination',
    //   type: 'bullets',
    //   clickable: true
    // },
    // navigation: {
    //   nextEl: '.button-next',
    //   prevEl: '.button-prev',
    // },
    // on: {
    //   init: (el: any) => animationSlide(el.slides[el.activeIndex], 0),
    //   slideChangeTransitionStart: (el: any) => animationSlide(el.slides[el.activeIndex], 0),
    // },
    // autoplay: {
    //   delay: 3000,
    // },
  }
  new Swiper(".mySwiper", {
    ...defaultSetting,
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    //   clickable: true,
    //   draggable: true
    // },
    
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        // Các tùy chọn khác
        allowTouchMove: false,   // Vô hiệu hóa di chuyển cảm ứng
      },
      640: {
        slidesPerView: 2,
      }
    },
  });

  new Swiper(".swiper-arrivals-topselling", {
    ...defaultSetting,
    slidesPerView: 1.8,
    spaceBetween: 16,
    lazy: true,
    breakpoints: {
      1280: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 2,
      }
    },
  });
  new Swiper(".swiper-products", {
    ...defaultSetting,
    slidesPerView: 1,
    navigation: {
      nextEl: '.button-next-page',
      prevEl: '.button-prev-page',
    },
    pagination: {
      el: ".swiper-pagination-pageoke",
      clickable: true,
      renderBullet: function (index:any, className:any) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    // slidesPerGroup: 9,
    // grid: {
    //   rows: 3,
    // },
    spaceBetween: 16,
    lazy: true,
    // breakpoints: {
    //   1280: {
    //     slidesPerView: 4,
    //   },
    //   1024: {
    //     slidesPerView: 3,
    //   },
    //   800: {
    //     slidesPerView: 2.8,
    //   },
    //   600: {
    //     slidesPerView: 2,
    //   }
    // },
  });


  let swiper = new Swiper(".oke2", {
    // spaceBetween: 12,
    direction: 'vertical',
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  new Swiper(".oke1", {
    direction: 'vertical',
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    //   // hide: true,
    // },
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });

  let swiper2 = new Swiper(".swiper-select", {
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  new Swiper(".swiper-rating", {
    ...defaultSetting,
    slidesPerView: 1,
    spaceBetween: 16, 
    // Start from the second slide (index 1)
    initialSlide: 1,
    scrollbar: {
      el: ".swiper-scrollbar",
      // hide: true,
    },
    thumbs: {
      swiper: swiper2,
    },
  });

}