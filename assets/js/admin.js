/**
 * 집밥연구소 관리자 모드 (CMS-lite 데모)
 * 실제 데이터베이스/인증 시스템이 아니라, localStorage 기반의 편집 데모입니다.
 * 여기서 저장한 내용은 이 브라우저에만 남고, 실제 배포된 정적 페이지에는 반영되지 않습니다.
 */
(function () {
  var KEYS = {
    posts: "hcl_admin_posts",
    columns: "hcl_admin_columns",
    categories: "hcl_admin_categories",
    settings: "hcl_admin_settings"
  };

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function readJSON(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* localStorage 사용 불가 환경 */
    }
  }

  function seedIfEmpty() {
    if (!window.localStorage.getItem(KEYS.posts)) {
      var seededPosts = (window.POSTS || []).map(function (p) {
        return {
          slug: p.slug,
          title: p.title,
          summary: p.summary,
          category: p.category,
          body: "",
          faq: "",
          related: (p.related || []).join(", "),
          featured: !!p.featured,
          status: "published",
          publishedAt: p.publishedAt,
          updatedAt: p.updatedAt
        };
      });
      writeJSON(KEYS.posts, seededPosts);
    }
    if (!window.localStorage.getItem(KEYS.columns)) {
      var seededColumns = (window.COLUMNS || []).map(function (c) {
        return {
          slug: c.slug,
          title: c.title,
          summary: c.summary,
          body: "",
          status: "published",
          publishedAt: c.publishedAt,
          updatedAt: c.updatedAt
        };
      });
      writeJSON(KEYS.columns, seededColumns);
    }
    if (!window.localStorage.getItem(KEYS.categories)) {
      writeJSON(KEYS.categories, (window.CATEGORIES || []).slice());
    }
    if (!window.localStorage.getItem(KEYS.settings)) {
      var cfg = window.SITE_CONFIG || {};
      writeJSON(KEYS.settings, {
        siteName: cfg.siteName,
        tagline: cfg.tagline,
        ownerName: cfg.ownerName,
        ownerBio: cfg.ownerBio,
        contactEmail: cfg.contactEmail,
        domain: cfg.domain,
        mainColor: cfg.mainColor,
        subColor: cfg.subColor
      });
    }
  }

  function getPosts() { return readJSON(KEYS.posts, []); }
  function setPosts(v) { writeJSON(KEYS.posts, v); }
  function getColumns() { return readJSON(KEYS.columns, []); }
  function setColumns(v) { writeJSON(KEYS.columns, v); }
  function getCategories() { return readJSON(KEYS.categories, []); }
  function setCategories(v) { writeJSON(KEYS.categories, v); }
  function getSettings() { return readJSON(KEYS.settings, {}); }
  function setSettings(v) { writeJSON(KEYS.settings, v); }

  function categoryName(slug) {
    var found = getCategories().filter(function (c) { return c.slug === slug; })[0];
    return found ? found.name : slug;
  }

  /* ---------- 로그인/로그아웃 ---------- */
  function showShell() {
    document.getElementById("adminLoginWrap").style.display = "none";
    document.getElementById("adminShell").classList.add("active");
    renderAll();
    route();
  }

  function showLogin() {
    document.getElementById("adminLoginWrap").style.display = "flex";
    document.getElementById("adminShell").classList.remove("active");
  }

  function initAuthUI() {
    var loginForm = document.getElementById("loginForm");
    var demoBtn = document.getElementById("demoLoginBtn");
    var logoutBtn = document.getElementById("logoutBtn");

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      window.HCL_AUTH.login();
      showShell();
    });
    demoBtn.addEventListener("click", function () {
      window.HCL_AUTH.login();
      showShell();
    });
    logoutBtn.addEventListener("click", function () {
      window.HCL_AUTH.logout();
      showLogin();
    });

    if (window.HCL_AUTH.isAdminLoggedIn()) {
      showShell();
    } else {
      showLogin();
    }
  }

  /* ---------- 라우팅 ---------- */
  function currentRoute() {
    return (window.location.hash || "#dashboard").replace(/^#/, "");
  }

  function setActiveNav(section) {
    document.querySelectorAll(".admin-nav-item[data-route]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-route") === section);
    });
  }

  function showView(name) {
    document.querySelectorAll(".admin-view").forEach(function (v) {
      v.classList.toggle("active", v.getAttribute("data-view") === name);
    });
  }

  function route() {
    var r = currentRoute();
    var parts = r.split("/");
    var section = parts[0] || "dashboard";

    if (section === "posts" && parts[1] === "new") {
      setActiveNav("posts");
      showView("post-edit");
      loadPostForm(null);
    } else if (section === "posts" && parts[1] === "edit") {
      setActiveNav("posts");
      showView("post-edit");
      loadPostForm(parts[2]);
    } else if (section === "posts") {
      setActiveNav("posts");
      showView("posts");
      renderPostsTable();
    } else if (section === "columns" && parts[1] === "new") {
      setActiveNav("columns");
      showView("column-edit");
      loadColumnForm(null);
    } else if (section === "columns" && parts[1] === "edit") {
      setActiveNav("columns");
      showView("column-edit");
      loadColumnForm(parts[2]);
    } else if (section === "columns") {
      setActiveNav("columns");
      showView("columns");
      renderColumnsTable();
    } else if (section === "categories") {
      setActiveNav("categories");
      showView("categories");
      renderCategories();
    } else if (section === "settings") {
      setActiveNav("settings");
      showView("settings");
      loadSettingsForm();
    } else {
      setActiveNav("dashboard");
      showView("dashboard");
      renderDashboard();
    }
  }

  function initNav() {
    document.querySelectorAll("[data-route]").forEach(function (el) {
      el.addEventListener("click", function () {
        window.location.hash = el.getAttribute("data-route");
      });
    });
    window.addEventListener("hashchange", route);
  }

  /* ---------- 대시보드 ---------- */
  function renderDashboard() {
    var posts = getPosts();
    var columns = getColumns();
    var categories = getCategories();
    var published = posts.filter(function (p) { return p.status === "published"; }).length;
    var draft = posts.length - published;
    var featured = posts.filter(function (p) { return p.featured; }).length;

    var cards = [
      { label: "총 글 수", num: posts.length },
      { label: "총 칼럼 수", num: columns.length },
      { label: "카테고리 수", num: categories.length },
      { label: "추천 글 수", num: featured },
      { label: "발행 / 초안", num: published + " / " + draft }
    ];
    document.getElementById("dashboardCards").innerHTML = cards
      .map(function (c) {
        return '<div class="admin-card"><div class="num">' + c.num + '</div><div class="label">' + c.label + "</div></div>";
      })
      .join("");

    var all = posts
      .map(function (p) { return { title: p.title, type: "글", status: p.status, updatedAt: p.updatedAt }; })
      .concat(
        columns.map(function (c) {
          return { title: c.title, type: "칼럼", status: c.status, updatedAt: c.updatedAt };
        })
      )
      .sort(function (a, b) { return new Date(b.updatedAt) - new Date(a.updatedAt); })
      .slice(0, 8);

    var tbody = document.querySelector("#recentTable tbody");
    tbody.innerHTML = all
      .map(function (r) {
        var badge = r.status === "published" ? '<span class="badge badge-published">발행</span>' : '<span class="badge badge-draft">초안</span>';
        return "<tr><td>" + r.title + "</td><td>" + r.type + "</td><td>" + badge + "</td><td>" + r.updatedAt + "</td></tr>";
      })
      .join("") || '<tr><td colspan="4" class="admin-empty">콘텐츠가 없습니다.</td></tr>';
  }

  /* ---------- 글 관리 ---------- */
  function renderPostsTable() {
    var posts = getPosts();
    var tbody = document.querySelector("#postsTable tbody");
    if (!posts.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="admin-empty">등록된 글이 없습니다.</td></tr>';
      return;
    }
    tbody.innerHTML = posts
      .map(function (p) {
        var badge = p.status === "published" ? '<span class="badge badge-published">발행</span>' : '<span class="badge badge-draft">초안</span>';
        return (
          "<tr><td>" + p.title + "</td><td>" + categoryName(p.category) + "</td><td>" + badge + "</td><td>" +
          (p.featured ? "⭐" : "") + "</td><td>" + p.updatedAt + "</td><td>" +
          '<div class="admin-row-actions">' +
          '<button class="btn btn-sm btn-outline" data-edit-post="' + p.slug + '">수정</button>' +
          '<button class="btn btn-sm btn-danger" data-delete-post="' + p.slug + '">삭제</button>' +
          "</div></td></tr>"
        );
      })
      .join("");

    tbody.querySelectorAll("[data-edit-post]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.location.hash = "posts/edit/" + btn.getAttribute("data-edit-post");
      });
    });
    tbody.querySelectorAll("[data-delete-post]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var slug = btn.getAttribute("data-delete-post");
        if (window.confirm("'" + slug + "' 글을 삭제하시겠습니까? (이 브라우저의 데모 데이터에서만 삭제됩니다)")) {
          setPosts(getPosts().filter(function (p) { return p.slug !== slug; }));
          renderPostsTable();
          renderDashboard();
        }
      });
    });
  }

  function populateCategorySelect() {
    var sel = document.getElementById("postCategory");
    sel.innerHTML = getCategories()
      .map(function (c) { return '<option value="' + c.slug + '">' + c.name + "</option>"; })
      .join("");
  }

  function loadPostForm(slug) {
    populateCategorySelect();
    var isNew = !slug;
    document.getElementById("postEditTitle").textContent = isNew ? "새 글 작성" : "글 수정: " + slug;
    document.getElementById("postPreviewPanel").style.display = "none";

    var post = isNew
      ? null
      : getPosts().filter(function (p) { return p.slug === slug; })[0];

    document.getElementById("postTitle").value = post ? post.title : "";
    document.getElementById("postSlug").value = post ? post.slug : "";
    document.getElementById("postSlug").disabled = !isNew;
    document.getElementById("postSummary").value = post ? post.summary : "";
    document.getElementById("postCategory").value = post ? post.category : (getCategories()[0] || {}).slug || "";
    document.getElementById("postStatus").value = post ? post.status : "draft";
    document.getElementById("postPublishedAt").value = post ? post.publishedAt : todayISO();
    document.getElementById("postUpdatedAt").value = post ? post.updatedAt : todayISO();
    document.getElementById("postBody").value = post ? post.body : "";
    document.getElementById("postFaq").value = post ? post.faq : "";
    document.getElementById("postRelated").value = post ? post.related : "";
    document.getElementById("postFeatured").checked = post ? !!post.featured : false;

    document.getElementById("postSaveBtn").onclick = function () { savePost(isNew, slug); };
    document.getElementById("postPreviewBtn").onclick = function () { previewPost(); };
  }

  function savePost(isNew, originalSlug) {
    var slug = document.getElementById("postSlug").value.trim();
    if (!slug) {
      window.alert("슬러그를 입력해 주세요.");
      return;
    }
    var posts = getPosts();
    var data = {
      slug: slug,
      title: document.getElementById("postTitle").value.trim(),
      summary: document.getElementById("postSummary").value.trim(),
      category: document.getElementById("postCategory").value,
      status: document.getElementById("postStatus").value,
      publishedAt: document.getElementById("postPublishedAt").value || todayISO(),
      updatedAt: document.getElementById("postUpdatedAt").value || todayISO(),
      body: document.getElementById("postBody").value,
      faq: document.getElementById("postFaq").value,
      related: document.getElementById("postRelated").value,
      featured: document.getElementById("postFeatured").checked
    };

    if (isNew) {
      posts.push(data);
    } else {
      posts = posts.map(function (p) { return p.slug === originalSlug ? data : p; });
    }
    setPosts(posts);
    window.alert("저장되었습니다. (이 브라우저의 데모 데이터에만 저장되며, 실제 사이트 파일에는 반영되지 않습니다)");
    window.location.hash = "posts";
  }

  function parseFaq(text) {
    var lines = (text || "").split("\n");
    var items = [];
    var current = null;
    lines.forEach(function (line) {
      var q = line.match(/^Q:\s*(.*)$/i);
      var a = line.match(/^A:\s*(.*)$/i);
      if (q) {
        current = { q: q[1], a: "" };
        items.push(current);
      } else if (a && current) {
        current.a = a[1];
      }
    });
    return items;
  }

  function previewPost() {
    var faqItems = parseFaq(document.getElementById("postFaq").value);
    var faqHtml = faqItems.length
      ? "<h3>FAQ</h3>" +
        faqItems.map(function (i) { return "<p><strong>Q. " + i.q + "</strong><br>A. " + i.a + "</p>"; }).join("")
      : "";
    var html =
      "<h2>" + (document.getElementById("postTitle").value || "(제목 없음)") + "</h2>" +
      "<p>" + (document.getElementById("postSummary").value || "") + "</p>" +
      "<div>" + (document.getElementById("postBody").value || "").replace(/\n/g, "<br>") + "</div>" +
      faqHtml;
    var panel = document.getElementById("postPreviewPanel");
    panel.innerHTML = html;
    panel.style.display = "block";
  }

  /* ---------- 칼럼 관리 ---------- */
  function renderColumnsTable() {
    var columns = getColumns();
    var tbody = document.querySelector("#columnsTable tbody");
    if (!columns.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="admin-empty">등록된 칼럼이 없습니다.</td></tr>';
      return;
    }
    tbody.innerHTML = columns
      .map(function (c) {
        var badge = c.status === "published" ? '<span class="badge badge-published">발행</span>' : '<span class="badge badge-draft">초안</span>';
        return (
          "<tr><td>" + c.title + "</td><td>한끼연구원</td><td>" + badge + "</td><td>" + c.updatedAt + "</td><td>" +
          '<div class="admin-row-actions">' +
          '<button class="btn btn-sm btn-outline" data-edit-col="' + c.slug + '">수정</button>' +
          '<button class="btn btn-sm btn-danger" data-delete-col="' + c.slug + '">삭제</button>' +
          "</div></td></tr>"
        );
      })
      .join("");

    tbody.querySelectorAll("[data-edit-col]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.location.hash = "columns/edit/" + btn.getAttribute("data-edit-col");
      });
    });
    tbody.querySelectorAll("[data-delete-col]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var slug = btn.getAttribute("data-delete-col");
        if (window.confirm("'" + slug + "' 칼럼을 삭제하시겠습니까? (이 브라우저의 데모 데이터에서만 삭제됩니다)")) {
          setColumns(getColumns().filter(function (c) { return c.slug !== slug; }));
          renderColumnsTable();
          renderDashboard();
        }
      });
    });
  }

  function loadColumnForm(slug) {
    var isNew = !slug;
    document.getElementById("columnEditTitle").textContent = isNew ? "새 칼럼 작성" : "칼럼 수정: " + slug;
    document.getElementById("columnPreviewPanel").style.display = "none";

    var col = isNew ? null : getColumns().filter(function (c) { return c.slug === slug; })[0];

    document.getElementById("columnTitle").value = col ? col.title : "";
    document.getElementById("columnSlug").value = col ? col.slug : "";
    document.getElementById("columnSlug").disabled = !isNew;
    document.getElementById("columnSummary").value = col ? col.summary : "";
    document.getElementById("columnStatus").value = col ? col.status : "draft";
    document.getElementById("columnPublishedAt").value = col ? col.publishedAt : todayISO();
    document.getElementById("columnUpdatedAt").value = col ? col.updatedAt : todayISO();
    document.getElementById("columnBody").value = col ? col.body : "";

    document.getElementById("columnSaveBtn").onclick = function () { saveColumn(isNew, slug); };
    document.getElementById("columnPreviewBtn").onclick = function () { previewColumn(); };
  }

  function saveColumn(isNew, originalSlug) {
    var slug = document.getElementById("columnSlug").value.trim();
    if (!slug) {
      window.alert("슬러그를 입력해 주세요.");
      return;
    }
    var columns = getColumns();
    var data = {
      slug: slug,
      title: document.getElementById("columnTitle").value.trim(),
      summary: document.getElementById("columnSummary").value.trim(),
      status: document.getElementById("columnStatus").value,
      publishedAt: document.getElementById("columnPublishedAt").value || todayISO(),
      updatedAt: document.getElementById("columnUpdatedAt").value || todayISO(),
      body: document.getElementById("columnBody").value
    };

    if (isNew) {
      columns.push(data);
    } else {
      columns = columns.map(function (c) { return c.slug === originalSlug ? data : c; });
    }
    setColumns(columns);
    window.alert("저장되었습니다. (이 브라우저의 데모 데이터에만 저장되며, 실제 사이트 파일에는 반영되지 않습니다)");
    window.location.hash = "columns";
  }

  function previewColumn() {
    var html =
      '<span class="badge badge-column">칼럼</span>' +
      "<h2>" + (document.getElementById("columnTitle").value || "(제목 없음)") + "</h2>" +
      "<p>글쓴이: 한끼연구원</p>" +
      "<p>" + (document.getElementById("columnSummary").value || "") + "</p>" +
      "<div>" + (document.getElementById("columnBody").value || "").replace(/\n/g, "<br>") + "</div>";
    var panel = document.getElementById("columnPreviewPanel");
    panel.innerHTML = html;
    panel.style.display = "block";
  }

  /* ---------- 카테고리 ---------- */
  function renderCategories() {
    var categories = getCategories();
    var panel = document.getElementById("categoriesPanel");
    panel.innerHTML = categories
      .map(function (c, idx) {
        return (
          '<div class="admin-form-grid" style="border-bottom:1px solid var(--color-border);padding:14px 0;">' +
          '<div class="form-group"><label>슬러그</label><input type="text" value="' + c.slug + '" disabled></div>' +
          '<div class="form-group"><label>이름</label><input type="text" data-cat-name="' + idx + '" value="' + c.name + '"></div>' +
          '<div class="form-group full"><label>설명</label><textarea rows="2" data-cat-desc="' + idx + '">' + c.description + "</textarea></div>" +
          "</div>"
        );
      })
      .join("") + '<button class="btn btn-primary" id="categoriesSaveBtn" type="button" style="margin-top:14px;">카테고리 저장</button>';

    document.getElementById("categoriesSaveBtn").addEventListener("click", function () {
      var updated = categories.map(function (c, idx) {
        var nameEl = panel.querySelector('[data-cat-name="' + idx + '"]');
        var descEl = panel.querySelector('[data-cat-desc="' + idx + '"]');
        return {
          slug: c.slug,
          name: nameEl ? nameEl.value : c.name,
          shortDesc: c.shortDesc,
          description: descEl ? descEl.value : c.description
        };
      });
      setCategories(updated);
      window.alert("카테고리 정보가 저장되었습니다. (데모 데이터에만 반영됩니다)");
    });
  }

  /* ---------- 사이트 설정 ---------- */
  function loadSettingsForm() {
    var s = getSettings();
    document.getElementById("setSiteName").value = s.siteName || "";
    document.getElementById("setTagline").value = s.tagline || "";
    document.getElementById("setOwnerName").value = s.ownerName || "";
    document.getElementById("setOwnerBio").value = s.ownerBio || "";
    document.getElementById("setEmail").value = s.contactEmail || "";
    document.getElementById("setDomain").value = s.domain || "";
    document.getElementById("setMainColor").value = s.mainColor || "#F97316";
    document.getElementById("setSubColor").value = s.subColor || "#FFF7ED";

    document.getElementById("settingsSaveBtn").onclick = function () {
      setSettings({
        siteName: document.getElementById("setSiteName").value,
        tagline: document.getElementById("setTagline").value,
        ownerName: document.getElementById("setOwnerName").value,
        ownerBio: document.getElementById("setOwnerBio").value,
        contactEmail: document.getElementById("setEmail").value,
        domain: document.getElementById("setDomain").value,
        mainColor: document.getElementById("setMainColor").value,
        subColor: document.getElementById("setSubColor").value
      });
      window.alert(
        "설정이 데모 데이터에 저장되었습니다. 실제 사이트 전체에 반영하려면 data/site.config.js 파일과 assets/css/style.css의 색상 변수를 직접 수정해야 합니다."
      );
    };
  }

  /* ---------- 데이터 관리: export / import / reset ---------- */
  function initDataTools() {
    document.getElementById("exportBtn").addEventListener("click", function () {
      var payload = {
        posts: getPosts(),
        columns: getColumns(),
        categories: getCategories(),
        settings: getSettings(),
        exportedAt: new Date().toISOString()
      };
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "zipbabstudio-cms-data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    document.getElementById("importBtn").addEventListener("click", function () {
      document.getElementById("importFile").click();
    });

    document.getElementById("importFile").addEventListener("change", function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(reader.result);
          if (data.posts) setPosts(data.posts);
          if (data.columns) setColumns(data.columns);
          if (data.categories) setCategories(data.categories);
          if (data.settings) setSettings(data.settings);
          window.alert("JSON 데이터를 불러왔습니다.");
          renderAll();
          route();
        } catch (err) {
          window.alert("JSON 파일을 읽는 중 오류가 발생했습니다. 파일 형식을 확인해 주세요.");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    document.getElementById("resetBtn").addEventListener("click", function () {
      if (!window.confirm("기본 데이터로 초기화하시겠습니까? 지금까지 편집한 데모 데이터는 사라집니다.")) return;
      window.localStorage.removeItem(KEYS.posts);
      window.localStorage.removeItem(KEYS.columns);
      window.localStorage.removeItem(KEYS.categories);
      window.localStorage.removeItem(KEYS.settings);
      seedIfEmpty();
      window.alert("기본 데이터로 초기화되었습니다.");
      renderAll();
      route();
    });
  }

  function renderAll() {
    renderDashboard();
    renderPostsTable();
    renderColumnsTable();
  }

  document.addEventListener("DOMContentLoaded", function () {
    seedIfEmpty();
    initAuthUI();
    initNav();
    initDataTools();
  });
})();
