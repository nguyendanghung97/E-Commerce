export const setupMenuMobile = (collectionElementsByClass: HTMLCollectionOf<Element>) => {

    Array.from(collectionElementsByClass).forEach((el) => el.addEventListener('click', () => {
        if (el.classList.contains('handle-menu')) {
            toggleClassList(document.getElementById('bg-menu'), ['opacity-0', 'opacity-50', 'invisible']);
            toggleClassList(document.getElementById('hamburger'), ['active']);
            toggleClassList(document.getElementById('menu'), ['invisible', '-left-32', 'left-0', 'opacity-100', 'opacity-0']);
            toggleClassList(document.getElementById('list-menu'), []);
        }
        
        // Handle search
        if (el.classList.contains('handle-search')) {
            toggleClassList(document.getElementById('logo'), ['w-0', 'invisible', 'opacity-0']);
            toggleClassList(document.getElementById('area-icon'), ['flex-1']);
            toggleClassList(document.getElementById('search-container'), ['w-6', 'w-full', 'sm:w-60', 'bg-[#F0F0F0]']);
            toggleClassList(document.getElementById('search'), ['w-0']);
            toggleClassList(document.getElementById('hamburger2'), ['opacity-40']);
        }

        // Handle filter
        if (el.classList.contains('handle-filter')) {
            toggleClassList(document.getElementById('bg-filter'), ['opacity-0', 'opacity-50', 'invisible']);
            toggleClassList(document.getElementById('filter'), ['invisible', 'opacity-0', 'top-full', 'top-24']);
        }
    //     const isShow = document.getElementById('hamburger')!.classList.contains('active');
    //   setTimeout(() => {
    //     toggleClassList(document.getElementById('bg-menu'), ['opacity-0', 'opacity-70', 'invisible']);
    //   }, !isShow ? 0 : 200)
    //   setTimeout(() => {
    //     toggleClassList(document.getElementById('hamburger'), ['active']);
    //     // toggleClassList(document.getElementById('hamburger2'), ['active']);
    //     toggleClassList(document.getElementById('menu'), ['invisible', '-left-32', 'left-0', 'opacity-100', 'opacity-0']);
    //     toggleClassList(document.getElementById('list-menu'), []);
    //   },!isShow ? 200 : 0);
    //   setTimeout(() => {
    //     toggleClassList(document.getElementById('hamburger2'), ['active']);
    //     document.getElementById('menu')?.classList.add('invisible');
    //   },!isShow2 ? 200 : 0);
  
    }));
  }
  export const toggleClassList = (element: HTMLElement| null, classList: string[]) => element && classList.forEach((e) => element.classList.toggle(e))
  
  