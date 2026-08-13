/* EuroExpress Áruház — webshop interakciók
   (mobil menü, szűrő fiók, rendezés, termékgaléria) */

(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    /* --- Mobil menü ---------------------------------------------------- */
    var menuToggle = document.querySelector('[data-ee-menu-toggle]');
    var mobileMenu = document.querySelector('[data-ee-mobile-menu]');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function () {
        var open = mobileMenu.classList.toggle('is-open');
        mobileMenu.hidden = !open;
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
      });
    }

    /* --- Szűrő fiók mobilon -------------------------------------------- */
    var facets = document.querySelector('[data-ee-facets]');
    var openFacets = document.querySelector('[data-ee-facets-open]');
    var closeFacets = document.querySelector('[data-ee-facets-close]');

    function setFacets(open) {
      if (!facets) return;
      facets.classList.toggle('is-open', open);
      document.body.classList.toggle('ee-scroll-lock', open);
      if (openFacets) openFacets.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (openFacets) openFacets.addEventListener('click', function () { setFacets(true); });
    if (closeFacets) closeFacets.addEventListener('click', function () { setFacets(false); });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setFacets(false);
    });

    /* --- Szűrő és rendezés automatikus beküldése ------------------------ */
    var facetForm = document.querySelector('[data-ee-facet-form]');
    if (facetForm) {
      facetForm.addEventListener('change', function (event) {
        if (event.target.matches('input[type="checkbox"], select')) {
          facetForm.submit();
        }
      });
    }

    var sortSelect = document.querySelector('[data-ee-sort]');
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        var form = sortSelect.closest('form');
        if (form) form.submit();
      });
    }

    /* --- Termékgaléria -------------------------------------------------- */
    var gallery = document.querySelector('[data-ee-gallery]');
    if (gallery) {
      var mainImage = gallery.querySelector('[data-ee-gallery-main] img');
      gallery.querySelectorAll('[data-ee-gallery-thumb]').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          if (!mainImage) return;
          var full = thumb.getAttribute('data-full');
          var alt = thumb.getAttribute('data-alt') || '';
          if (full) {
            mainImage.setAttribute('src', full);
            mainImage.setAttribute('srcset', '');
            mainImage.setAttribute('alt', alt);
          }
          gallery.querySelectorAll('[data-ee-gallery-thumb]').forEach(function (other) {
            other.classList.toggle('is-active', other === thumb);
          });
        });
      });
    }

    /* --- Mennyiség léptető (webshop réteg) ------------------------------ */
    document.querySelectorAll('.ee-qty').forEach(function (box) {
      var input = box.querySelector('input[type="number"]');
      if (!input) return;

      box.querySelectorAll('[data-ee-qty]').forEach(function (button) {
        button.addEventListener('click', function () {
          var step = button.getAttribute('data-ee-qty') === 'plus' ? 1 : -1;
          var min = parseInt(input.min || '1', 10);
          var next = parseInt(input.value || '1', 10) + step;
          input.value = Math.max(next, min);
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  });
})();
