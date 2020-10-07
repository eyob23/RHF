//useFormPersist copyed from useFormPersist https://github.com/tiaanduplessis/react-hook-form-persist
//debounce copyed from underscore.js https://github.com/jashkenas/underscore/blob/master/modules/debounce.js
import { useEffect } from "react";
const debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
const save = debounce(function (data) {
  console.log("debounce");
  console.log(data);
}, 250);
const useFormPersist = (
  name,
  { watch, setValue, reset },
  {
    storage = window.sessionStorage,
    exclude = [],
    include,
    onDataRestored
  } = {}
) => {
  const values = watch(include); //watch(include);

  useEffect(() => {
    const str = storage.getItem(name);
    if (str) {
      const values = JSON.parse(str);
      const dataRestored = {};
      Object.keys(values).forEach((key) => {
        const shouldSet = !exclude.includes(key);
        if (shouldSet) {
          //console.log("key", "values");
          //console.log(key, values[key]);
          dataRestored[key] = values[key];
          //console.log(key);
          setValue(key, values[key]);
        }
      });

      if (onDataRestored) {
        onDataRestored(dataRestored);
      }
      reset(dataRestored, {
        errors: true, // errors will not be reset
        dirtyFields: false, // dirtyFields will not be reset
        isDirty: true, // dirty will not be reset
        isSubmitted: false,
        touched: false,
        isValid: false,
        submitCount: false
      });
    }
  }, [name]);

  useEffect(() => {
    storage.setItem(name, JSON.stringify(values));
    save(values);
  });
  return {
    clear: () => storage.removeItem(name)
  };
};
//https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086

export default useFormPersist;
