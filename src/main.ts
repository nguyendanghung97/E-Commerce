import { handleBars } from './handlebars';
handleBars('template-quantities', '.quantities');
handleBars('template-brands', '.brands');
handleBars('template-brands-responsive', '.brands-responsive');
handleBars('template-newArrivals', '.newArrivals');
handleBars('template-oke', '.oke');
handleBars('template-topSelling', '.topSelling');
handleBars('template-comments', '.comments');
handleBars('template-AboutUs', '.AboutUs');
handleBars('template-nav', '.nav');
handleBars('template-Shop', '.Shop');
handleBars('template-shop-responsive',".shop-responsive");
handleBars('template-colors',".colors");
handleBars('template-sizes',".sizes");
handleBars('template-collections',".collections");
handleBars('template-styles',".styles");


import { setupSwiper } from './swiper';
setupSwiper();

import { setupMenuMobile } from './menu-mobile';
setupMenuMobile(document.getElementsByClassName('handle-menu'));
setupMenuMobile(document.getElementsByClassName('handle-search'));
setupMenuMobile(document.getElementsByClassName('handle-filter'));

// GLightboxjs 3
const glightbox:any = GLightbox({
    // touchNavigation: false,
    // loop: false,
    // autoplayVideos: true,  
});
glightbox.init()
// Appearjs
// Nếu appear.js không có kiểu định nghĩa sẵn, bạn có thể khai báo nó như sau:
// declare function appear(options: {
//     elements: () => NodeListOf<Element>;
//     appear: (el: Element) => void;
//   }): void;
// // Your TypeScript code
// appear({
//     elements: (): NodeListOf<Element> => document.querySelectorAll('.odometer'),
//     appear: (el: Element): void => {
//     if (el instanceof HTMLElement) {
//         el.innerHTML = el.dataset.count || '';
//     }
//     },
// });

// Header
// let lastScrollTop = 0;
const header = document.getElementById('header');
document.addEventListener('scroll', function() {
  header!.classList.toggle("animate-headerSticky", scrollY > 0);
  header!.classList.toggle("shadow", scrollY > 0);
  // Lấy vị trí cuộn hiện tại và lưu vào biến st.
  // document.documentElement: Đây là cách để truy cập vào phần tử <html> của tài liệu HTML.
  // let st = document.documentElement.scrollTop;
  // if (st > lastScrollTop) {
  //     header!.style.position = 'absolute';
  //     header!.classList.remove('animate-headerSticky');
  // } else {
  //     // Người dùng đang cuộn lên st < lastScrollTop
  //     header!.style.position = 'fixed';
  //     header!.classList.add('animate-headerSticky');
  // }
  // // Cập nhật vị trí cuộn trước đó
  // lastScrollTop = st;
});


// Back To Top and Progress when scroll
// Vị trí cuối cùng của cuộn xuống
let lastScrollTop = 0;
document.addEventListener('scroll', () => {{
    let pos = 0;
    let scrollProgress = document.getElementById('backToTop');
    // Lấy vị trí cuộn hiện tại
    pos = document.documentElement.scrollTop;
    // Chiều cao của cả trang web
    let calcHeight = 
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
    // Lấy phần trăm nguyên
    let scrollValue = Math.round((pos * 100)/ calcHeight);
    
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
        window.scrollTo({top: 0, behavior: 'smooth'});
    })
}})

// Smooth
window.scroll({behavior: 'smooth'})


// gsap hiện ẩn, xoay icon
export const Gsap = (classCollapse: string, classContent: string, classICon:string) => {
  const time: any = {};
  // const state: any = {};
  document.querySelectorAll(classCollapse).forEach((el: any) => el.addEventListener('click', (e: any) => {
    e.preventDefault();
    const handleContent = el.parentElement.querySelector(classContent);
    const icon = Array.from(el.querySelectorAll(classICon));
   
    
    if (!time[el.id]) time[el.id] = gsap.timeline({defaults: {duration: 0.25, ease: 'power1.inOut'}});
    else {
      time[el.id][time[el.id].reversed() ? 'play' : 'reverse']();
      return
    }
    
    if (classContent === '.handle-content' && handleContent) {
      time[el.id]
        .to(el.parentElement.querySelector(classContent), {height: 'auto'}, '0');
      time[el.id]
        .to(icon, { transform: 'rotate(-90deg)'}, '0');
    }
    if (classContent === '.handle-content-reverse' && handleContent) {
      time[el.id]
        .to(el.parentElement.querySelector(classContent), {height: '0'}, 'auto');
      time[el.id]
        .to(icon, { transform: 'rotate(90deg)'}, '0');
    }

    
    // const collapseCurrent = e.currentTarget;
    // const targetId = collapseCurrent.id;
    // const parentElement = collapseCurrent.parentElement;
    // const contentCurrent = parentElement.querySelector('.handle-content');
    
    // // Đóng tất cả .handle-content khác trong cùng một thẻ cha
    // document.querySelectorAll('.handle-content').forEach((element) => {
    //   // có một timeline đã được tạo cho element.id không
    //   if (element !== contentCurrent && time[element.id]) {
    //     console.log(time[element.id])
    //     time[element.id].reverse();
    //     // Cập nhật trạng thái state[element.id] để đánh dấu rằng phần tử đã được đóng.
    //     state[element.id] = true; 
    //   }
    // });
    
    // if (!time[targetId]) {
    //   time[targetId] = gsap.timeline({ defaults: { duration: 0.25, ease: 'power1.inOut' } });
    // } else {
    //   // nếu state[targetId] đang mở là true khi click sẽ chạy time[targetId].reverse();
    //   // nếu state[targetId] đang đóng là false khi click sẽ chạy time[targetId].play();
    //   time[targetId][state[targetId] ? 'play' : 'reverse']();
    //   // Cập nhật trạng thái: đang là false khi click sẽ thành true và ngược lại
    //   state[targetId] = !state[targetId]; 
    //   return;
    // }

    // // Mở contentElement của handle-collapse được click
    // time[targetId].to(contentCurrent, { height: 'auto' }, '0');
    // time[targetId].to(el.querySelector('.arrow-down'), { transform: 'rotate(-90deg)'}, '0');


  }));
}
Gsap('.handle-collapse', '.handle-content', '.arrow-down');
Gsap('.handle-collapse', '.handle-content-reverse', '.arrow-up');
Gsap('.handle-collapse-child', '.handle-content', '.arrow-down');

// blur swiper
// Mặc định blur ở màn hình lg trước khi click
  // Lấy chiều ngang màn hình
var screenWidth = window.innerWidth;
if (screenWidth > 1024) {
  let els = document.querySelectorAll('.mySwiper .swiper-slide');
  const elActive:any = document.querySelector(".mySwiper .swiper-slide-active");
  if (Array.from(els).includes(elActive)) {
    let index = Array.from(els).indexOf(elActive);
    const elFilter = els[index+3];
    elFilter.classList.add('blur-sm');
  }
}
// cập nhật index liên tục
const buttonNav = document.querySelectorAll('.button-nav');
Array.from(buttonNav).forEach((button:any) => {
  button.addEventListener('click', () => {
    const els = document.querySelectorAll('.mySwiper .swiper-slide');
    const elActive:any = document.querySelector(".mySwiper .swiper-slide-active");
    Array.from(els).forEach((el:any) => {
      el.classList.remove('blur-sm');
    })
    if (Array.from(els).includes(elActive)) {
      let index = Array.from(els).indexOf(elActive);
      let indexBlur = index+3;
      const elFilter = els[indexBlur];
      if (indexBlur < els.length) {
        elFilter.classList.add('blur-sm');
      }
    }
  })
})

// Function add class active
export const Active = (className: string, classActive: string) => {
  document.querySelectorAll(className).forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const elementCurrent = e.currentTarget as HTMLElement;
      // Xóa class active từ tất cả các phần tử
      document.querySelectorAll(className).forEach((el) => {
        el.classList.remove(classActive);
      });
      // Thêm class active vào phần tử hiện tại
      elementCurrent.classList.add(classActive);
      
    })
  })
}
Active('.color', 'color-active');
Active('.size', 'size-active');

// Filter price
const rangeInput = document.querySelectorAll('.range-input input') as NodeListOf<HTMLInputElement>;
const progress = document.querySelector('.slider .progress') as HTMLElement;
const priceMin = document.querySelector('.price-min') as HTMLElement;
const priceMax = document.querySelector('.price-max') as HTMLElement;

let priceGap = 50;

Array.from(rangeInput).forEach(input  => {
  input.addEventListener('input', (e) => {
    const currentTarget = e.currentTarget as HTMLInputElement;
    const minRange = rangeInput[0] as HTMLInputElement;
    const maxRange = rangeInput[1] as HTMLInputElement;
    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);

    if ( maxVal - minVal < priceGap) {
      if (currentTarget.classList.contains('range-min')) {
        minRange.value = `${maxVal - priceGap}`;
      } 
      else {
        maxRange.value = `${minVal + priceGap}`;
      }
    } else {
      priceMin.innerHTML = `$${minVal}`;
      priceMin.style.left = minVal/ parseInt(minRange.max) * 100 + "%";
      priceMax.innerHTML = `$${maxVal}`;
      priceMax.style.right = 100 - (maxVal/ parseInt(maxRange.max)) * 100 + "%";

      progress.style.left = minVal/ parseInt(minRange.max) * 100 + "%";
      progress.style.right = 100 - (maxVal/ parseInt(maxRange.max)) * 100 + "%";
    }
  })
})

// let course = {
//   name: "JS",
//   price: 1000,
//   age: 27,
// }

// let {price, oke1 = 'dsdsdsdsd', ...oke} = course;
// console.log('oke',oke1)
// interface Course {
//   name: string;
//   price: number;
//   age: number;
//   oke1: string;
// }

let course = {
  name: "JS",
  price: 1000,
  age: 27,
};

// Sử dụng Partial để chỉ rõ rằng đối tượng có thể có các thuộc tính tùy chọn
let { price, oke1 = 'dsdsdsdsd', ...oke }: { price: number; oke1?: string; name: string; age: number } = course;

console.log(price); // 1000
console.log(oke1);  // 'dsdsdsdsd'
console.log(oke);   // { name: 'JS', age: 27 }