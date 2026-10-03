// DIZHAO Bilingual Switcher
// Simple, focused, sufficient.

(function () {
  'use strict';

  var STORAGE_KEY = 'dizhao-lang';
  var DEFAULT_LANG = 'zh';

  // 從 localStorage 讀偏好，沒有就用預設
  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.documentElement.lang = (lang === 'en') ? 'en' : 'zh-Hant';
    applyLang(lang);
    updateSwitcher(lang);
  }

  // 切換所有 [data-zh] / [data-en] 元素
  function applyLang(lang) {
    // 1) 純文字內容切換
    var nodes = document.querySelectorAll('[data-zh]');
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var txt = n.getAttribute('data-' + lang);
      if (txt === null || txt === undefined) continue;
      // 支援 HTML 內容（用 data-zh-html / data-en-html）
      var htmlKey = 'data-' + lang + '-html';
      if (n.hasAttribute(htmlKey)) {
        n.innerHTML = n.getAttribute(htmlKey);
      } else {
        // 純文字，但保留原本的內部結構（如 <span>）
        if (n.children.length > 0) {
          // 有子元素 → 只更新 text node（簡化：替換整個 innerHTML）
          n.innerHTML = txt;
        } else {
          n.textContent = txt;
        }
      }
    }

    // 2) placeholder 切換（input/textarea）
    var inputs = document.querySelectorAll('[data-zh-placeholder]');
    for (var j = 0; j < inputs.length; j++) {
      var ph = inputs[j].getAttribute('data-' + lang + '-placeholder');
      if (ph) inputs[j].setAttribute('placeholder', ph);
    }

    // 3) select option 切換
    var opts = document.querySelectorAll('option[data-zh]');
    for (var k = 0; k < opts.length; k++) {
      var ot = opts[k].getAttribute('data-' + lang);
      if (ot) opts[k].textContent = ot;
    }
  }

  // 更新切換按鈕外觀
  function updateSwitcher(lang) {
    var btns = document.querySelectorAll('[data-lang-switch]');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      btn.setAttribute('data-current', lang);
      var label = btn.querySelector('[data-zh],[data-en]');
      if (label) {
        var enLabel = btn.querySelector('[data-switch-label-en]');
        var zhLabel = btn.querySelector('[data-switch-label-zh]');
        // 顯示「切換到另一個語言」的提示
        var hint = (lang === 'en') ? 'Switch to 中文' : '切換到 English';
        if (zhLabel) zhLabel.textContent = '中';
        if (enLabel) enLabel.textContent = 'EN';
        var hintNode = btn.querySelector('[data-switch-hint]');
        if (hintNode) hintNode.textContent = hint;
      }
    }
    // 標記當前語言狀態（給 CSS 用）
    document.documentElement.setAttribute('data-lang', lang);
  }

  // 綁定切換按鈕
  function bindSwitches() {
    var btns = document.querySelectorAll('[data-lang-switch]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        e.preventDefault();
        var current = this.getAttribute('data-current') || getLang();
        var next = (current === 'zh') ? 'en' : 'zh';
        setLang(next);
      });
    }
  }

  // 啟動
  function init() {
    var lang = getLang();
    document.documentElement.lang = (lang === 'en') ? 'en' : 'zh-Hant';
    document.documentElement.setAttribute('data-lang', lang);
    applyLang(lang);
    bindSwitches();
    updateSwitcher(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();