export const setupMenuMobile = (collectionElementsByClass: HTMLCollectionOf<Element>) => {
   Array.from(collectionElementsByClass).forEach((el) =>
      el.addEventListener('click', () => {
         if (el.classList.contains('handle-menu')) {
            toggleClassList(document.getElementById('bg-menu'), ['opacity-0', 'opacity-50', 'invisible']);
            toggleClassList(document.getElementById('hamburger'), ['active']);
            toggleClassList(document.getElementById('menu'), [
               'invisible',
               '-left-32',
               'left-0',
               'opacity-100',
               'opacity-0',
            ]);
            toggleClassList(document.getElementById('list-menu'), []);
         }

         // Handle search
         if (el.classList.contains('handle-search') && window.innerWidth < 768) {
            toggleClassList(document.getElementById('logo'), ['w-0']);
            toggleClassList(document.getElementById('search-container'), ['w-0', 'flex-1']);
            toggleClassList(document.getElementById('hamburger2'), ['opacity-40', 'flex', 'hidden']);
         }

         // Handle filter
         if (el.classList.contains('handle-filter')) {
            toggleClassList(document.getElementById('bg-filter'), ['opacity-0', 'opacity-50', 'invisible']);
            toggleClassList(document.getElementById('filter'), [
               'invisible',
               'opacity-0',
               'top-full',
               'top-36',
               'sm:-left-full',
               'sm:left-0',
            ]);
         }
      }),
   );
};
export const toggleClassList = (element: HTMLElement | null, classList: string[]) =>
   element && classList.forEach((e) => element.classList.toggle(e));
