(function () {
  "use strict";

  var bookingFallback = "https://calendly.com/saayuj-novararobotics/30min";
  var LOCATION_KEY = "novara:lastPath";
  var SECTION_IDS = ["top", "product", "deployment", "outcomes", "demo"];

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
      links.style.display = "";
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

  function pageFile() {
    var parts = location.pathname.split("/").filter(Boolean);
    var last = parts[parts.length - 1] || "index.html";
    if (!/\.html?$/i.test(last)) return "index.html";
    return last;
  }

  function isHomePage(file) {
    return file === "index.html";
  }

  function getSavedPath() {
    try {
      return sessionStorage.getItem(LOCATION_KEY);
    } catch (err) {
      return null;
    }
  }

  function setSavedPath(value) {
    try {
      sessionStorage.setItem(LOCATION_KEY, value);
    } catch (err) {
      /* ignore quota / private mode */
    }
  }

  function pathFromHref(href) {
    if (!href || href.charAt(0) === "?" || href.indexOf("mailto:") === 0) return null;
    if (href.charAt(0) === "#") return href === "#" ? "#top" : href;

    var withoutQuery = href.split("?")[0];
    var hashIndex = withoutQuery.indexOf("#");
    var hash = hashIndex >= 0 ? withoutQuery.slice(hashIndex) : "";
    var pathPart = hashIndex >= 0 ? withoutQuery.slice(0, hashIndex) : withoutQuery;
    var file = pathPart.split("/").pop() || "";

    if (file === "privacy.html" || file === "terms.html") return file;
    if (!file || file === "index.html" || file === "." || file === "./") {
      return hash || "#top";
    }
    return null;
  }

  function scrollToHash(behavior) {
    var id = (location.hash || "").replace(/^#/, "");
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: behavior || "auto", block: "start" });
  }

  function initLocationMemory() {
    var file = pageFile();

    document.addEventListener("click", function (event) {
      var anchor = event.target.closest("a[href]");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      var next = pathFromHref(anchor.getAttribute("href"));
      if (next) setSavedPath(next);
    });

    if (file === "privacy.html" || file === "terms.html") {
      setSavedPath(file);
      return;
    }

    if (!isHomePage(file)) return;

    var saved = getSavedPath();

    if (!location.hash) {
      if (saved === "privacy.html" || saved === "terms.html") {
        location.replace("./" + saved);
        return;
      }
      if (saved && saved.charAt(0) === "#" && saved !== "#top") {
        history.replaceState(null, "", saved);
      }
    }

    if (location.hash && location.hash !== "#top") {
      setSavedPath(location.hash);
      scrollToHash("auto");
      window.addEventListener("load", function () {
        scrollToHash("auto");
      });
    } else if (!saved || saved === "#top") {
      setSavedPath("#top");
    }

    if (!("IntersectionObserver" in window)) return;

    var sections = SECTION_IDS.map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    if (!sections.length) return;

    var spy = new IntersectionObserver(function (entries) {
      var visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      if (!visible) return;

      var id = visible.target.id;
      var hash = "#" + id;
      setSavedPath(hash);
      if (location.hash !== hash) {
        history.replaceState(null, "", hash);
      }
    }, {
      rootMargin: "-40% 0px -45% 0px",
      threshold: [0, 0.25, 0.5, 0.75]
    });

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  wirePartnerButtons();
  initMobileNav();
  initHeaderScroll();
  initReveals();
  initLocationMemory();
})();
