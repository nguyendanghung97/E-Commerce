import { setupSwiper } from './swiper';
import { handleBars } from './handlebars';
import { dataHandleBars, generalColors, popularSizes, producDefaulttWithStars } from './dataHandleBars';

// Đối tượng time lưu trữ các timeline của từng phần tử theo nhóm và ID
const time: Record<string, Record<string, any>> = {};
// gsap hiện ẩn, xoay icon
export const Gsap = (classContent: string, classICon: string, timeGroup: string) => {
   if (!time[timeGroup]) {
      time[timeGroup] = {}; // Khởi tạo nhóm nếu chưa tồn tại
   }
   document.querySelectorAll('.handle-gsap').forEach((el: any) => {
      el.addEventListener('click', (e: any) => {
         e.preventDefault();
         const handleContent = el.parentElement.querySelector(classContent);
         const icon = el.querySelectorAll(classICon);

         // Tạo mới timeline cho phần tử theo id
         if (!time[timeGroup][el.id]) {
            time[timeGroup][el.id] = gsap.timeline({ defaults: { duration: 0.25, ease: 'power1.inOut' } });
         } else {
            time[timeGroup][el.id][time[timeGroup][el.id].reversed() ? 'play' : 'reverse']();
            return;
         }

         if (handleContent) {
            // Điều chỉnh trạng thái của phần tử dựa trên classContent
            if (classContent === '.gsap-expand') {
               time[timeGroup][el.id].to(handleContent, { height: 'auto' }, '0');
               time[timeGroup][el.id].to(icon, { transform: 'rotate(-90deg)' }, '0');
            } else {
               time[timeGroup][el.id].to(handleContent, { height: '0' }, 'auto');
               time[timeGroup][el.id].to(icon, { transform: 'rotate(90deg)' }, '0');
            }
         }
      });
   });
};

// Reset tất cả các GSAP của nhóm
export const resetGsapGroup = (timeGroup: string, elementIds: string[]) => {
   if (!time[timeGroup]) return;

   elementIds.forEach((elId) => {
      const timeline = time[timeGroup][elId];
      const el = document.getElementById(elId);
      const content = el?.parentElement?.querySelector('.gsap-expand');
      const icon = el?.querySelector('.arrow-down');

      if (timeline) {
         timeline.pause(0);
         delete time[timeGroup][elId];
      }

      if (content) {
         gsap.set(content, { height: 0 }); //reset content
      }
      if (icon) {
         gsap.set(icon, { transform: 'rotate(0deg)' }); // reset icon
      }
   });
};

Gsap('.gsap-collapse', '.arrow-up', 'timeCollapse');

export function loadHeader() {
   const headerElement = document.getElementById('header');

   fetch('header.html')
      .then((response) => response.text())
      .then((data) => {
         if (headerElement) {
            headerElement.innerHTML = data;
         }
      })
      .then(() => {
         handleBars('template-nav', '.nav', { items: dataHandleBars.nav });
         handleBars('template-Shop', '.Shop', { items: dataHandleBars.Shop });
         handleBars('template-shop-responsive', '.shop-responsive', { items: dataHandleBars.Shop });
      })
      .then(() => {
         requestAnimationFrame(() => {
            document.addEventListener('scroll', function () {
               if (headerElement) {
                  headerElement.classList.toggle('animate-headerSticky', window.scrollY > 0);
                  headerElement.classList.toggle('shadow', window.scrollY > 0);
               }
            });
         });
      })
      .then(() => {
         // 🔥 Phát ra sự kiện cho nơi khác có thể lắng nghe
         document.dispatchEvent(new CustomEvent('headerLoaded'));
      })
      .catch((error) => {
         console.error('Có lỗi khi load header:', error);
      });
}

document.addEventListener('headerLoaded', () => {
   setupMenuMobile(document.getElementsByClassName('handle-menu'));
   setupMenuMobile(document.getElementsByClassName('handle-search'));

   Gsap('.gsap-expand', '.arrow-down', 'timeExpanded');

   // Theo dõi class active trong hamburger
   const hamburger = document.getElementById('hamburger');
   if (hamburger) {
      const observer = new MutationObserver(() => {
         if (!hamburger.classList.contains('active')) {
            resetGsapGroup('timeExpanded', ['Shop', 'Men', 'Women']);
         }
      });
      observer.observe(hamburger, {
         attributes: true, // Theo dõi thay đổi về thuộc tính của phần tử
         attributeFilter: ['class'], // Chỉ theo dõi sự thay đổi class
      });
   }
});

// Tải phần header vào trong thẻ có id="header"
window.onload = function () {
   loadHeader();
   const footerElement = document.getElementById('footer');

   // Tải nội dung footer
   fetch('footer.html')
      .then((response) => response.text())
      .then((data) => {
         if (footerElement) {
            footerElement.innerHTML = data;
         }
      })
      .then(() => {
         handleBars('template-AboutUs', '.AboutUs', { items: dataHandleBars.AboutUs });
      })
      .catch((error) => {
         console.error('Có lỗi xảy ra:', error);
      });
};

handleBars('template-quantities', '.quantities', { items: dataHandleBars.quantities });
handleBars('template-brands', '.brands', { items: dataHandleBars.brands });
handleBars('template-brands-responsive', '.brands-responsive', { items: dataHandleBars.brands });
handleBars('template-swiper-rating', '.swiper-rating', { items: dataHandleBars.comments });
handleBars('template-rating', '.rating', { items: dataHandleBars.comments });
handleBars('template-colors', '.colors', { items: dataHandleBars.colors });
handleBars('template-sizes', '.sizes', { items: dataHandleBars.sizes });
handleBars('template-collections', '.collections', { items: dataHandleBars.types });
handleBars('template-styles', '.styles', { items: dataHandleBars.styles });
handleBars('template-swiper-category', '.swiper-category', {
   productsCategory: dataHandleBars.products ?? [],
   chunkSize: window.innerWidth > 768 ? 9 : 6,
});
['newArrivals', 'topSelling', 'productRecommended'].forEach((nameCollection) => {
   const data = dataHandleBars.products.filter((p) => p.collection === nameCollection);
   handleBars(`template-${nameCollection}`, `.${nameCollection}`, { items: data });
});

const handleClickGetId = (el: HTMLElement): void => {
   const id = parseInt(el.dataset.id!);
   const productActive = dataHandleBars.products.find((p) => p.id === id);

   if (!productActive) return;

   // ✅ Lưu itemActive vào localStorage
   localStorage.setItem('productActive', JSON.stringify(productActive));
};
// Gắn vào window để dùng trong HTML
(window as any).globalFn = { handleClickGetId };

document.addEventListener('DOMContentLoaded', () => {
   const productActiveStr = localStorage.getItem('productActive');
   if (productActiveStr) {
      const productActive = JSON.parse(productActiveStr);
      handleBars('template-product-detail', '.product-detail', {
         item: {
            ...productActive,
            colors:
               Array.isArray(productActive.colors) && productActive.colors.length > 0
                  ? productActive.colors
                  : generalColors,
            quantityColors: window.innerWidth > 1024 ? generalColors.length : 3,
            sizes:
               Array.isArray(productActive.sizes) && productActive.sizes.length > 0
                  ? productActive.sizes
                  : popularSizes,
            quantitySizes: window.innerWidth > 1024 ? popularSizes.length : 3,
         },
         showThumnails: productActive.images.length > 1,
      });
   } else {
      handleBars('template-product-detail', '.product-detail', {
         item: producDefaulttWithStars,
         showThumnails: producDefaulttWithStars.images.length > 1,
      });
   }
   setupSwiper();
   Active('.color');
   Active('.size');

   // Handle counter
   const quantityEls = document.querySelectorAll('.quantity-procduct-select');
   const increaseBtn = document.getElementById('increase');
   const decreaseBtn = document.getElementById('decrease');

   let quantity = 1;

   if (increaseBtn) {
      console.log('khfkshfshk');
      increaseBtn.addEventListener('click', () => {
         console.log('kdhkhdkad');
         quantity++;
         console.log('quantity', quantity);
         Array.from(quantityEls).forEach((el) => {
            el.textContent = String(quantity);
         });
      });
   }
   decreaseBtn!.addEventListener('click', () => {
      if (quantity > 1) {
         quantity--;
         Array.from(quantityEls).forEach((el) => {
            el.textContent = String(quantity);
         });
      }
   });
   console.log('quantity', quantity);
});

// Chỉ chạy khi đang ở /product-detail
if (location.pathname != '/product-detail.html') {
   localStorage.removeItem('productActive');
}

// setupSwiper();

import { setupMenuMobile } from './menu-mobile';
setupMenuMobile(document.getElementsByClassName('handle-filter'));

// Appearjs
declare var appear: any;
appear({
   elements: () => document.querySelectorAll('.odometer'),
   // sử dụng giá trị từ thuộc tính data-count để đặt nội dung cho phần tử.
   appear: (el: HTMLElement) => (el.innerHTML = el.dataset.count || ''),
});

// LazyLoad.js
declare var LazyLoad: any;
// Khởi tạo LazyLoad với callback khi có lỗi
new LazyLoad({
   callback_error: (el: HTMLImageElement) => {
      // Cập nhật src với URL placeholder khi có lỗi
      el.src = 'https://via.placeholder.com/1x1/?text=';
   },
});

// Back To Top and Progress when scroll
// Vị trí cuối cùng của cuộn xuống
let lastScrollTop = 0;
document.addEventListener('scroll', () => {
   {
      let pos = 0;
      let scrollProgress = document.getElementById('backToTop');
      // Lấy vị trí cuộn hiện tại
      pos = document.documentElement.scrollTop;
      // Chiều cao của cả trang web
      let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      // Lấy phần trăm nguyên
      let scrollValue = Math.round((pos * 100) / calcHeight);

      if (pos > lastScrollTop || pos == 0) {
         scrollProgress!.style.display = 'none';
      } else {
         // Người dùng đang cuộn lên st < lastScrollTop
         scrollProgress!.style.display = 'flex';
      }
      // Cập nhật vị trí cuộn trước đó
      lastScrollTop = pos;

      // if (pos > 96) {
      //     scrollProgress!.style.display = 'flex';
      // } else {
      //     scrollProgress!.style.display = 'none';
      // }

      scrollProgress!.style.background = `conic-gradient(black ${scrollValue}%, #d7d7d7 ${scrollValue}% )`;
      scrollProgress?.addEventListener('click', () => {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      });
   }
});

// Smooth
window.scroll({ behavior: 'smooth' });

// Function add class active
export const Active = (className: string) => {
   document.querySelectorAll(className).forEach((el) => {
      el.addEventListener('click', (e) => {
         e.preventDefault();
         const elementCurrent = e.currentTarget as HTMLElement;
         // Xóa class active từ tất cả các phần tử
         document.querySelectorAll(className).forEach((el) => {
            el.classList.remove('active');
         });
         // Thêm class active vào phần tử hiện tại
         elementCurrent.classList.add('active');
      });
   });
};
Active('.color');
Active('.size');

// Filter price
const rangeInput = document.querySelectorAll('.range-input input') as NodeListOf<HTMLInputElement>;
Array.from(rangeInput).forEach((input) => {
   const progress = document.querySelector('.slider .progress') as HTMLElement;
   const priceMin = document.querySelector('.price-min') as HTMLElement;
   const priceMax = document.querySelector('.price-max') as HTMLElement;

   let priceGap = 50;
   input.addEventListener('input', (e) => {
      const currentTarget = e.currentTarget as HTMLInputElement;
      const minRange = rangeInput[0] as HTMLInputElement;
      const maxRange = rangeInput[1] as HTMLInputElement;
      let minVal = parseInt(minRange.value);
      let maxVal = parseInt(maxRange.value);

      if (maxVal - minVal < priceGap) {
         if (currentTarget.classList.contains('range-min')) {
            minRange.value = `${maxVal - priceGap}`;
         } else {
            maxRange.value = `${minVal + priceGap}`;
         }
      } else {
         priceMin.innerHTML = `$${minVal}`;
         priceMin.style.left = (minVal / parseInt(minRange.max)) * 100 + '%';
         priceMax.innerHTML = `$${maxVal}`;
         priceMax.style.right = 100 - (maxVal / parseInt(maxRange.max)) * 100 + '%';

         progress.style.left = (minVal / parseInt(minRange.max)) * 100 + '%';
         progress.style.right = 100 - (maxVal / parseInt(maxRange.max)) * 100 + '%';
      }
   });
});
