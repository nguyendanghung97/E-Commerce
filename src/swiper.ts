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
   };

   new Swiper('.swiper-rating', {
      // các options của bạn...
      on: {
         init(swiper: any) {
            const els = swiper.slides;
            const index = swiper.activeIndex;

            const indicesBlur = [index - 1, index + 3];

            // Thêm blur khi Swiper khởi tạo
            els.forEach((el: HTMLElement) => el.classList.remove('blur-sm'));

            indicesBlur.forEach((i) => {
               if (i >= 0 && i < els.length) {
                  els[i].classList.add('blur-sm');
               }
            });
         },
         slideChange(swiper: any) {
            const els = swiper.slides;
            const index = swiper.activeIndex;

            const indicesBlur = [index - 1, index + 3];

            // Xóa blur cũ trước
            els.forEach((el: HTMLElement) => el.classList.remove('blur-sm'));

            // Thêm blur mới
            indicesBlur.forEach((i) => {
               if (i >= 0 && i < els.length) {
                  els[i].classList.add('blur-sm');
               }
            });
         },
      },
      autoplay: {
         delay: 2000,
      },
      ...defaultSetting,
      slidesPerView: 1,
      spaceBetween: 16,
      navigation: {
         nextEl: '.button-next',
         prevEl: '.button-prev',
      },
      breakpoints: {
         1024: {
            slidesPerView: 3,
            // Các tùy chọn khác
            allowTouchMove: false, // Vô hiệu hóa di chuyển cảm ứng
         },
         640: {
            slidesPerView: 2,
         },
      },
   });

   new Swiper('.swiper-category', {
      ...defaultSetting,
      slidesPerView: 1,
      navigation: {
         nextEl: '.button-next-page',
         prevEl: '.button-prev-page',
      },
      pagination: {
         el: '.swiper-pagination-page',
         clickable: true,
         renderBullet: function (index: any, className: any) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
         },
      },
      spaceBetween: 16,
      lazy: true,
   });

   (() => {
      const swiperProductDetail = new Swiper('.swiper-product-main', {
         ...defaultSetting,
         direction: 'horizontal',
         thumbs: {
            swiper: {
               el: '.product-thumbnails',
               slidesPerView: 3,
               direction: window.innerWidth > 640 ? 'vertical' : 'horizontal',
               spaceBetween: window.innerWidth > 640 ? 14 : 12,
            },
         },
         breakpoints: {
            641: {
               direction: 'vertical',
            },
         },
      });

      const glightbox = GLightbox({
         selector: '.glightbox',
      });

      glightbox.on('slide_changed', ({ current }: any) => {
         if (current?.index !== undefined) {
            swiperProductDetail.slideTo(current.index);
         }
      });
   })();

   new Swiper('.swiper-content-tabs', {
      simulateTouch: false, // Tắt tính năng kéo bằng chuột
      allowTouchMove: false, // Tắt tính năng kéo bằng cảm ứng (touch)
      autoHeight: true, // Bật chế độ tự động điều chỉnh chiều cao
      slidesPerView: 1,
      spaceBetween: 16,
      // Start from the second slide (index 1)
      initialSlide: 1,
      scrollbar: {
         el: '.swiper-scrollbar',
         // hide: true,
      },
      thumbs: {
         swiper: {
            el: '.product-detail-tabs',
            slidesPerView: 3,
         },
      },
   });
};
