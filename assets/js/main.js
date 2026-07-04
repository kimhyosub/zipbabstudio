/**
 * 공통 헤더/푸터/내비게이션 렌더링
 * data/site.config.js 값을 읽어 모든 페이지에 동일하게 반영합니다.
 * 사이트명, 메뉴, 이메일, 정책 링크 등을 바꾸려면 site.config.js만 수정하면 됩니다.
 */
(function () {
  var cfg = window.SITE_CONFIG;
  if (!cfg) return;

  function currentPath() {
    return window.location.pathname.replace(/index\.html$/, "");
  }

  function isCurrent(href) {
    var path = currentPath();
    if (href === "/") return path === "/";
    return path.indexOf(href) === 0;
  }

  function renderHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;

    var navHtml = cfg.nav
      .map(function (item) {
        var current = isCurrent(item.href) ? ' aria-current="page"' : "";
        return '<a href="' + item.href + '"' + current + ">" + item.label + "</a>";
      })
      .join("");

    el.innerHTML =
      '<div class="header-inner">' +
      '<a href="/" class="brand">' +
      '<span class="brand-mark" aria-hidden="true">🍚</span>' +
      "<span>" +
      cfg.siteName +
      '<span class="brand-sub">' +
      cfg.tagline +
      "</span></span>" +
      "</a>" +
      '<button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mainNav">메뉴</button>' +
      '<nav class="main-nav" id="mainNav" aria-label="주요 메뉴">' +
      navHtml +
      "</nav>" +
      "</div>";

    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  function renderFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;

    var linksHtml = cfg.footerLinks
      .map(function (item) {
        return '<li><a href="' + item.href + '">' + item.label + "</a></li>";
      })
      .join("");

    el.innerHTML =
      '<div class="footer-inner">' +
      '<div class="footer-brand">' +
      "<strong>" +
      cfg.siteName +
      "</strong>" +
      "<p>" +
      cfg.description +
      "</p>" +
      '<p>운영자 <a class="owner-name-link" href="/author/">' +
      cfg.ownerName +
      "</a> · " +
      cfg.ownerBio +
      "</p>" +
      "</div>" +
      '<div class="footer-col">' +
      "<h4>정책 및 안내</h4>" +
      "<ul>" +
      linksHtml +
      "</ul>" +
      "</div>" +
      '<div class="footer-col">' +
      "<h4>문의</h4>" +
      "<ul><li><a href=\"mailto:" +
      cfg.contactEmail +
      '">' +
      cfg.contactEmail +
      "</a></li><li><a href=\"/contact/\">문의 페이지 바로가기</a></li></ul>" +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
      "<span>&copy; " +
      new Date().getFullYear() +
      " " +
      cfg.siteName +
      " · " +
      cfg.domain +
      "</span>" +
      "<span>Since " +
      cfg.foundedYear +
      "</span>" +
      "</div>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
  });

  window.HCL = window.HCL || {};
  window.HCL.formatDate = function (isoDate) {
    if (!isoDate) return "";
    var parts = isoDate.split("-");
    return parts[0] + "년 " + parseInt(parts[1], 10) + "월 " + parseInt(parts[2], 10) + "일";
  };

  var CATEGORY_ICONS = {
    banchan: "🥬",
    "one-dish": "🍚",
    beginner: "🔰",
    "kitchen-tools": "🍳",
    ingredients: "🧊"
  };

  window.HCL.categoryName = function (slug) {
    var found = (window.CATEGORIES || []).filter(function (c) {
      return c.slug === slug;
    })[0];
    return found ? found.name : slug;
  };

  window.HCL.renderPostCards = function (containerId, posts) {
    var el = document.getElementById(containerId);
    if (!el) return;
    if (!posts.length) {
      el.innerHTML = '<p class="admin-empty">아직 등록된 글이 없습니다.</p>';
      return;
    }
    el.innerHTML = posts
      .map(function (p) {
        return (
          '<article class="post-card">' +
          '<div class="post-card-thumb" aria-hidden="true">' +
          (CATEGORY_ICONS[p.category] || "🍽") +
          "</div>" +
          '<div class="post-card-body">' +
          '<span class="post-card-cat">' +
          window.HCL.categoryName(p.category) +
          "</span>" +
          "<h3><a href=\"/posts/" +
          p.slug +
          '/">' +
          p.title +
          "</a></h3>" +
          "<p>" +
          p.summary +
          "</p>" +
          '<div class="post-card-meta">' +
          "<span>발행 " +
          window.HCL.formatDate(p.publishedAt) +
          "</span>" +
          "<span>수정 " +
          window.HCL.formatDate(p.updatedAt) +
          "</span>" +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  };

  window.HCL.renderColumnCards = function (containerId, columns) {
    var el = document.getElementById(containerId);
    if (!el) return;
    if (!columns.length) {
      el.innerHTML = '<p class="admin-empty">아직 등록된 칼럼이 없습니다.</p>';
      return;
    }
    el.innerHTML = columns
      .map(function (c) {
        return (
          '<article class="post-card column-card">' +
          '<div class="post-card-thumb" aria-hidden="true" style="background:linear-gradient(135deg,#EFEAFC,#D9CDF7);color:#5B3EBF;">✍️</div>' +
          '<div class="post-card-body">' +
          '<span class="badge badge-column">칼럼</span>' +
          "<h3><a href=\"/columns/" +
          c.slug +
          '/">' +
          c.title +
          "</a></h3>" +
          "<p>" +
          c.summary +
          "</p>" +
          '<div class="post-card-meta">' +
          "<span>" +
          window.HCL.formatDate(c.publishedAt) +
          "</span>" +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  };
})();
