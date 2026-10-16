// game-page.js: screenshot carousel for game pages. Load with: <script src="/game-page.js" defer></script>
(function () {
  "use strict";
  document.querySelectorAll("[data-gallery]").forEach(function (g) {
    var track = g.querySelector(".gallery-track");
    var slides = track.children;
    var prev = g.querySelector(".prev"), next = g.querySelector(".next");
    var count = g.querySelector(".gallery-count");

    if (slides.length < 2) { g.classList.add("single"); return; }   // nothing to scroll through

    function index() { return Math.round(track.scrollLeft / track.clientWidth); }
    function update() {
      var i = index();
      count.textContent = (i + 1) + " / " + slides.length;
      prev.disabled = i <= 0;
      next.disabled = i >= slides.length - 1;
    }
    // Go to a specific slide. "pending" remembers where a click is already heading,
    // so quick repeated clicks keep moving one slide each instead of being swallowed.
    var pending = null, timer = null;
    function go(dir) {
      var i = (pending === null ? index() : pending) + dir;
      i = Math.max(0, Math.min(slides.length - 1, i));
      pending = i;
      track.scrollTo({ left: i * track.clientWidth });
      clearTimeout(timer);
      timer = setTimeout(function () { pending = null; }, 700);
    }
    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });
})();
