export const handleBars = (idTemplate: string, className: string, data: Record<string, any>, callback?: () => void) => {
   const temp = document.getElementById(idTemplate);
   if (temp) {
      // Đăng ký helper tùy chỉnh để giới hạn số phần tử
      Handlebars.registerHelper('limit', function (arr: any, limit: number) {
         if (!Array.isArray(arr)) {
            return [];
         }
         return arr.slice(0, limit);
      });

      Handlebars.registerHelper('chunk', function (array: any, size: number) {
         if (!Array.isArray(array)) {
            return []; // Nếu không phải mảng, trả về mảng rỗng
         }
         const result = [];
         for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
         }
         return result;
      });

      Handlebars.registerHelper('fallback', function (value: string, fallbackValue: string) {
         return value || fallbackValue;
      });

      Handlebars.registerHelper('addActive', function (index: number, target: number) {
         return index === target ? 'active' : '';
      });

      const template = Handlebars.compile(temp.innerHTML);

      var elements = document.querySelectorAll(className);
      elements.forEach(function (element) {
         element.innerHTML = template(data);
      });

      // Gọi callback nếu có
      callback?.();
   }
};
