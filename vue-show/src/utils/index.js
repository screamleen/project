import Vue from 'vue';
export default {
  install () {
    Vue.prototype.deepCopy = function (source) {
      if (typeof source === 'object' && source !== null) {
        if (this.isArray(source)) {
          return source.map((ele) => {
            return this.deepCopy(ele);
          });
        } else {
          const target = {};
          for (const key in source) {
            if (source.hasOwnProperty(key)) {
              target[key] = this.deepCopy(source[key]);
            }
          }

          return target;
        }
      } else {
        return source;
      }
    };
    Vue.prototype.isArray = function (source) {
      return Object.prototype.toString.call(source) === '[object Array]';
    };
  }
};
