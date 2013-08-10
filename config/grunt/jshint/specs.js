"use strict";

module.exports = {
  options: {
    browser: true,
    globals: {
      // RequireJs
      require: true,
      define: true,
      // Jasmine
      expect: true,
      describe: true,
      it: true
    }
  },
  files: { src: ['spec/**/*.js'] }
};
