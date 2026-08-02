(function () {
  "use strict";

  var bookingFallback = "https://calendly.com/saayuj-novararobotics/30min";

  function bookingUrl() {
    var cfg = window.SITE_CONFIG || {};
    return cfg.demoBookingUrl || bookingFallback;
  }

  function wirePartnerButtons() {
    var url = bookingUrl();
    document.querySelectorAll(".btn-partner").forEach(function (el) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");
    var header = document.querySelector(".site-header");
    if (!toggle || !links || !header) return;

    function setOpen(open) {
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      links.style.display = open ? "flex" : "";
    }

    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("nav-open"));
    });

    links.querySelectorAll("a").forEach(function (anchor) {
      anchor.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var threshold = 24;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > threshold);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initReveals() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    nodes.forEach(function (el) { observer.observe(el); });
  }

  wirePartnerButtons();
  initMobileNav();
  initHeaderScroll();
  initReveals();
})();
