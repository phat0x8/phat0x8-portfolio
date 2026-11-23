(function () {
  if (window.__phat0x8InitBound) return;
  window.__phat0x8InitBound = true;

  var LANG_KEY = 'phat0x8_lang';
  var SFX_KEY = 'phat0x8_sfx';
  var GH_CACHE_KEY = 'phat0x8_gh_repos_v1';
  var FEATURED_REPOS = new Set([
    'secbert-cda-attack-classification',
    'iam302t_schr_bench',
    'getapps-travel-platform',
    'enterprise-it-operations-casebook',
    'dfir-forensics-casebook',
    'smart_digital_clock_with_arduino',
    'phat0x8-portfolio',
    'phat0x8',
  ]);

  var audioCtx = null;

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isSfxEnabled() {
    try {
      return localStorage.getItem(SFX_KEY) === 'on' && !prefersReducedMotion();
    } catch (e) {
      return false;
    }
  }

  function playTone(type) {
    if (!isSfxEnabled()) return;
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      var now = audioCtx.currentTime;
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'toggle') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(860, now + 0.065);
        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.085);
      } else if (type === 'copy') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.setValueAtTime(990, now + 0.045);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
        osc.start(now);
        osc.stop(now + 0.12);
      } else {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.035);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {}
  }

  function applyLang(lang) {
    var safe = lang === 'vi' ? 'vi' : 'en';
    document.documentElement.dataset.lang = safe;
    document.documentElement.lang = safe;
    try {
      localStorage.setItem(LANG_KEY, safe);
    } catch (e) {}

    var searchInput = document.getElementById('casebook-search');
    if (searchInput) {
      var ph = searchInput.getAttribute(safe === 'vi' ? 'data-placeholder-vi' : 'data-placeholder-en');
      if (ph) searchInput.setAttribute('placeholder', ph);
    }
  }

  function syncSfxButton() {
    var btn = document.getElementById('sfx-toggle');
    if (!btn) return;
    var on = false;
    try {
      on = localStorage.getItem(SFX_KEY) === 'on';
    } catch (e) {}
    btn.textContent = on ? 'SFX: ON' : 'SFX: OFF';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.classList.toggle('active-state', on);
  }

  function bindHeaderControls() {
    var langBtn = document.getElementById('lang-toggle');
    if (langBtn && !langBtn.dataset.bound) {
      langBtn.dataset.bound = '1';
      langBtn.addEventListener('click', function () {
        var next = document.documentElement.dataset.lang === 'vi' ? 'en' : 'vi';
        applyLang(next);
        playTone('toggle');
      });
    }

    var sfxBtn = document.getElementById('sfx-toggle');
    if (sfxBtn && !sfxBtn.dataset.bound) {
      sfxBtn.dataset.bound = '1';
      sfxBtn.addEventListener('click', function () {
        var next = localStorage.getItem(SFX_KEY) === 'on' ? 'off' : 'on';
        try {
          localStorage.setItem(SFX_KEY, next);
        } catch (e) {}
        syncSfxButton();
        if (next === 'on') playTone('toggle');
      });
    }

    var menuBtn = document.getElementById('mobile-menu-btn');
    var nav = document.getElementById('primary-nav');
    if (menuBtn && nav && !menuBtn.dataset.bound) {
      menuBtn.dataset.bound = '1';
      menuBtn.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        playTone('click');
      });
    }

    document.querySelectorAll('[data-sfx="click"]').forEach(function (el) {
      if (el.dataset.sfxBound) return;
      el.dataset.sfxBound = '1';
      el.addEventListener('click', function () {
        playTone('click');
      });
    });
  }

  function bindCasebookFilters() {
    var grid = document.getElementById('casebook-grid');
    var search = document.getElementById('casebook-search');
    var filtersWrap = document.getElementById('casebook-filters');
    var empty = document.getElementById('casebook-empty');
    if (!grid || !search || !filtersWrap) return;

    var activeCat = 'All';
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.casebook-card'));

    function runFilter() {
      var q = (search.value || '').trim().toLowerCase();
      var visible = 0;
      cards.forEach(function (card) {
        var cat = card.getAttribute('data-category') || '';
        var hay = card.getAttribute('data-search') || '';
        var matchCat = activeCat === 'All' || cat === activeCat;
        var matchText = !q || hay.indexOf(q) !== -1;
        var show = matchCat && matchText;
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
    }

    if (!search.dataset.bound) {
      search.dataset.bound = '1';
      search.addEventListener('input', runFilter);
    }

    filtersWrap.querySelectorAll('.filter-pill').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        activeCat = btn.getAttribute('data-filter') || 'All';
        filtersWrap.querySelectorAll('.filter-pill').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        runFilter();
      });
    });
  }

  function enhanceCodeBlocks() {
    document.querySelectorAll('.prose pre').forEach(function (pre) {
      if (pre.querySelector('.copy-code-btn')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-code-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', function () {
        var code = pre.querySelector('code');
        var text = code ? code.innerText : pre.innerText;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = 'Copied ✓';
            btn.classList.add('copied');
            playTone('copy');
            setTimeout(function () {
              btn.textContent = 'Copy';
              btn.classList.remove('copied');
            }, 1600);
          });
        }
      });
      pre.appendChild(btn);
    });
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderGitHubSync(repos) {
    var statusEl = document.getElementById('github-sync-text');
    var container = document.getElementById('github-dynamic-repos');
    if (!statusEl) return;

    var publicRepos = repos.filter(function (r) {
      return !r.fork;
    });
    var latest = publicRepos[0];
    var latestDate = latest && latest.pushed_at ? latest.pushed_at.slice(0, 10) : 'recent';

    statusEl.innerHTML =
      '<span class="lang-en">GitHub live · ' +
      publicRepos.length +
      ' public source repos synced · Latest push ' +
      escapeHtml(latestDate) +
      '</span>' +
      '<span class="lang-vi">Đồng bộ GitHub trực tiếp · ' +
      publicRepos.length +
      ' repo công khai · Cập nhật gần nhất ' +
      escapeHtml(latestDate) +
      '</span>';

    if (!container) return;
    var extras = publicRepos
      .filter(function (r) {
        return !FEATURED_REPOS.has((r.name || '').toLowerCase());
      })
      .slice(0, 3);

    if (extras.length === 0) {
      container.hidden = true;
      return;
    }

    container.innerHTML = extras
      .map(function (r) {
        var lang = r.language ? r.language : 'Docs';
        var updated = r.pushed_at ? r.pushed_at.slice(0, 10) : '';
        var desc = r.description ? r.description : 'Public repository on github.com/phat0x8';
        return (
          '<a class="gh-mini-card" href="' +
          escapeHtml(r.html_url) +
          '" target="_blank" rel="noopener noreferrer">' +
          '<div class="gh-mini-name">NEW · ' +
          escapeHtml(r.name) +
          ' ↗</div>' +
          '<div class="gh-mini-desc">' +
          escapeHtml(desc) +
          '</div>' +
          '<div class="gh-mini-meta">' +
          escapeHtml(lang) +
          ' · Updated ' +
          escapeHtml(updated) +
          '</div>' +
          '</a>'
        );
      })
      .join('');
    container.hidden = false;
  }

  function initGitHubSync() {
    var bar = document.getElementById('github-sync-bar');
    if (!bar) return;
    var user = bar.getAttribute('data-github-user') || 'phat0x8';

    try {
      var cachedRaw = sessionStorage.getItem(GH_CACHE_KEY);
      if (cachedRaw) {
        var cached = JSON.parse(cachedRaw);
        if (cached && Date.now() - cached.ts < 10 * 60 * 1000 && Array.isArray(cached.repos)) {
          renderGitHubSync(cached.repos);
          return;
        }
      }
    } catch (e) {}

    fetch('https://api.github.com/users/' + encodeURIComponent(user) + '/repos?sort=pushed&per_page=15', {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (repos) {
        if (!Array.isArray(repos)) return;
        try {
          sessionStorage.setItem(GH_CACHE_KEY, JSON.stringify({ ts: Date.now(), repos: repos }));
        } catch (e) {}
        renderGitHubSync(repos);
      })
      .catch(function () {
        var statusEl = document.getElementById('github-sync-text');
        if (statusEl) {
          statusEl.innerHTML =
            '<span class="lang-en">GitHub live check skipped (offline/rate limit) · 6 curated repos featured above</span>' +
            '<span class="lang-vi">Tạm bỏ qua đồng bộ GitHub trực tiếp · 6 dự án tiêu biểu hiển thị ở trên</span>';
        }
      });
  }

  function initSitePage() {
    var savedLang = 'en';
    try {
      savedLang = localStorage.getItem(LANG_KEY) === 'vi' ? 'vi' : 'en';
    } catch (e) {}
    applyLang(savedLang);
    syncSfxButton();
    bindHeaderControls();
    bindCasebookFilters();
    enhanceCodeBlocks();
    initGitHubSync();
  }

  document.addEventListener('astro:after-swap', function () {
    var saved = 'en';
    try {
      saved = localStorage.getItem(LANG_KEY) === 'vi' ? 'vi' : 'en';
    } catch (e) {}
    applyLang(saved);
  });

  document.addEventListener('astro:page-load', initSitePage);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSitePage);
  } else {
    initSitePage();
  }
})();
