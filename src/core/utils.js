/* eslint-disable no-unused-vars */
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

/**
 * Progressive Image loading
 */

// replace with full image
function loadFullImage(item, className) {
  const href = item && (item.getAttribute('data-href') || item.href);
  if (!href) return;

  // load image
  const img = new Image();
  if (item.dataset) {
    img.srcset = item.dataset.srcset || '';
    img.sizes = item.dataset.sizes || '';
  }
  img.src = href;
  img.className = className;

  // replace image
  const addImg = () => {
    requestAnimationFrame(() => {
      // disable click
      if (href === item.href) {
        // eslint-disable-next-line no-param-reassign
        item.style.cursor = 'default';
        item.addEventListener(
          'click',
          e => {
            e.preventDefault();
          },
          false,
        );
      }

      // preview image
      const pImg = item.children[0];

      // add full image
      item.insertBefore(img, pImg).addEventListener('animationend', () => {
        // remove preview image
        if (pImg) {
          img.alt = pImg.alt || '';
          img.title = pImg.title || '';
          item.removeChild(pImg);
        }

        img.classList.remove(className);
      });
    });
  };

  if (img.complete) addImg();
  else img.onload = addImg;
}

export function inView(pItem, _pCount, className) {
  if (pItem.length)
    requestAnimFrame(() => {
      // eslint-disable-next-line one-var
      let cRect,
        cT,
        cH,
        p = 0;
      const wH = window.innerHeight;

      while (p < pItem.length) {
        cRect = pItem[p].getBoundingClientRect();
        cT = cRect.top;
        cH = cRect.height;
        if (cT + cH > 0 && wH > cT) {
          loadFullImage(pItem[p], className);
          pItem[p].classList.remove('replace');
        } else p++;
      }

      // eslint-disable-next-line no-param-reassign
      _pCount = pItem.length;
    });
}

export function imgProgressiveload(pItem, pCount, className) {
  // DOM mutation observer
  if (MutationObserver) {
    const observer = new MutationObserver(() => {
      if (pItem.length !== pCount) inView(pItem, pCount, className);
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });
  }

  // initial check
  inView(pItem, pCount, className);
}
