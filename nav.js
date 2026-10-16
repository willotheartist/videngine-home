// Site menu below the desktop breakpoint: close it on outside click, Escape, or choosing a link.
(function () {
  var menu = document.querySelector('.nav-menu');
  if (!menu) return;
  document.addEventListener('click', function (e) {
    if (menu.open && !menu.contains(e.target)) menu.open = false;
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('.nav-sheet a')) menu.open = false;
  });
})();
