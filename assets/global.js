/* EuroExpress Áruház — minimális globális JS */

document.addEventListener('DOMContentLoaded', function () {
  // Mennyiség +/- gombok (termékoldal és kosár)
  document.querySelectorAll('.qty-box').forEach(function (box) {
    var input = box.querySelector('input[type="number"]');
    var minus = box.querySelector('[data-qty-minus]');
    var plus = box.querySelector('[data-qty-plus]');
    if (!input) return;

    if (minus) {
      minus.addEventListener('click', function () {
        var min = parseInt(input.min || '0', 10);
        var value = parseInt(input.value || '1', 10) - 1;
        input.value = Math.max(value, min);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }

    if (plus) {
      plus.addEventListener('click', function () {
        input.value = parseInt(input.value || '1', 10) + 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  });

  // Mobil menü bezárása linkre kattintáskor
  document.querySelectorAll('.menu-drawer__panel a').forEach(function (link) {
    link.addEventListener('click', function () {
      var drawer = link.closest('details');
      if (drawer) drawer.removeAttribute('open');
    });
  });

  // Mobil menü bezárása, ha máshova kattint a felhasználó
  document.addEventListener('click', function (event) {
    document.querySelectorAll('details.menu-drawer[open]').forEach(function (drawer) {
      if (!drawer.contains(event.target)) drawer.removeAttribute('open');
    });
  });
});
