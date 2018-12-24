/* eslint-disable no-unused-expressions */

import throttle from 'lodash/throttle';

export const disableBodyScrolling = (condition, avoidFixed) => {
  if (condition) {
    document.body.style.overflow = 'hidden';
    // avoid fixed is used here in order to prevent the body from making position fixed.
    // this is used for disabling scroll while slider is active.
    !avoidFixed && (document.body.style.position = 'fixed'); // eslint-disable-line no-unused-expressions
  } else {
    document.body.style.overflow = 'visible';
    !avoidFixed && (document.body.style.position = 'static'); // eslint-disable-line no-unused-expressions
  }
};

export function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/("|')/g, '&quot;')
    .replace(/\{/g, '&lbrac;');
}

export function addRemoveScrollEventListener(fn, remove = false) {
  // detect if passive event listers are supported
  let supportPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => {
        supportPassive = true;
        return true;
      },
    });
    window.addEventListener('dummy', null, opts);
    window.removeEventListener('dummy', null, opts);
  } catch (err) {
    /* do nothing */
  }
  // attach event listener
  const scrollCB = throttle(fn, 200);
  const options = supportPassive ? { capture: true, passive: true } : true;
  remove
    ? window.removeEventListener('scroll', scrollCB, options)
    : window.addEventListener('scroll', scrollCB, options);
}

// raf shim
export const requestAnimFrame = (() => {
  if (!process.env.BROWSER) return () => ({});
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    (callback => setTimeout(callback, 1000 / 60))
  );
})();

export function scrollToTop(speed = 2000, easing = 'easeInOutQuint') {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  let currentTime = 0;

  // min time 0.1, max time 0.8 seconds
  const time = Math.max(0.1, Math.min(scrollY / speed, 0.8));

  // copied from https://github.com/danro/easing-js/blob/master/easing.js
  const easingEquations = {
    easeOutSine(pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine(pos) {
      return -0.5 * (Math.cos(Math.PI * pos) - 1);
    },
    easeInOutQuint(pos) {
      pos /= 0.5; // eslint-disable-line
      return pos < 1 ? 0.5 * pos ** 5 : 0.5 * ((pos - 2) ** 5 + 2);
    },
  };

  // add animation loop
  function tick() {
    // frame number
    currentTime += 1 / 60;
    // position in anim frame is (scrollY*currentTime/time)
    const p = currentTime / time;
    // do not multiply by scrollY yet as we need to add easing to position
    const t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);
      window.scrollTo(0, scrollY - scrollY * t);
    } else {
      window.scrollTo(0, 0);
    }
  }
  // call it once to get started
  tick();
}

function checkIFLSAvailable() {
  return process.env.BROWSER && typeof Storage !== 'undefined' && localStorage;
}

export function addItemToLS(key, value) {
  if (checkIFLSAvailable && typeof key === 'string') {
    localStorage.setItem(key, value);
    return true;
  }
  return false;
}

export function getItemFromLS(key) {
  if (checkIFLSAvailable && typeof key === 'string') {
    return localStorage.getItem(key);
  }
  return null;
}

export function fetchAndParseLSItem(key) {
  const value = getItemFromLS(key);
  if (value) {
    try {
      // try-catch needed because JSON.parse will break when JSON is invalid
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
  return null;
}
