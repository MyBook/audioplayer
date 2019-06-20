/* eslint-disable func-names, object-shorthand, */
// https://github.com/facebook/jest/issues/4545#issuecomment-332762365
// import fetchMock from "fetch-mock";
import { shallow, render, mount, configure } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

// mockConsole();
window.BASE_HOST = "audio.dev";

global.flushPromises = async function() {
  return new Promise(resolve => setImmediate(resolve));
};

// fixes warnings in react16
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.configure = configure;

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };

window.location.reload = jest.fn();

const instance = require("utils/doFetch").instance;

global.mock = new MockAdapter(instance);
