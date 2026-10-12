// site.js: small shared helpers for the main site. Load with: <script src="/site.js" defer></script>
(function () {
  "use strict";

  // 1) Keep the footer year current. Needs <span id="year"></span> in the footer.
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // 2) Open links to OTHER websites in a new tab. Internal links and mailto: are untouched.
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname !== location.hostname) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
  });

  // 3) Click-to-enlarge for screenshots and GIFs inside <figure class="media">.
  var images = document.querySelectorAll("figure.media img");
  if (images.length && typeof HTMLDialogElement === "function") {
    var dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Enlarged image");

    var big = document.createElement("img");
    var caption = document.createElement("p");
    dialog.appendChild(big);
    dialog.appendChild(caption);
    document.body.appendChild(dialog);

    // Click anywhere (image or dark background) to close. Esc also works.
    dialog.addEventListener("click", function () { dialog.close(); });

    images.forEach(function (img) {
      img.addEventListener("click", function () {
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        var fc = img.closest("figure") && img.closest("figure").querySelector("figcaption");
        caption.textContent = fc ? fc.textContent : "";
        dialog.showModal();
      });
    });
  }

  // 4) Slideshows: prev/next buttons and a "1 / N" counter.
  //    Needs the .slideshow markup (.slides, .prev, .next, .slide-count).
  document.querySelectorAll(".slideshow").forEach(function (show) {
    var track = show.querySelector(".slides");
    var count = show.querySelector(".slide-count");
    var prev = show.querySelector(".prev");
    var next = show.querySelector(".next");
    if (!track) return;
    var total = track.children.length;

    function update() {
      var i = Math.round(track.scrollLeft / track.clientWidth) + 1;
      if (count) count.textContent = i + " / " + total;
    }
    function go(dir) {
      track.scrollBy({ left: dir * track.clientWidth, behavior: "smooth" });
    }

    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    track.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    update();
  });
})();
