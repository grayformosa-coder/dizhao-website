// DIZHAO Contact Form Handler
// Uses FormSubmit.co for email forwarding to grey@dizhao.com.tw
// First-time setup: visit the URL once and confirm the activation email.
(function () {
  'use strict';

  function getFormStatus() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    // 隱藏 honeypot 反垃圾欄位
    if (!document.getElementById('_honey')) {
      var honey = document.createElement('input');
      honey.type = 'text';
      honey.name = '_honey';
      honey.id = '_honey';
      honey.style.position = 'absolute';
      honey.style.left = '-9999px';
      honey.setAttribute('tabindex', '-1');
      honey.setAttribute('autocomplete', 'off');
      form.appendChild(honey);
    }

    // 注入 FormSubmit 需要的隱藏欄位
    function ensureField(name, value) {
      var f = document.getElementById('_' + name);
      if (!f) {
        f = document.createElement('input');
        f.type = 'hidden';
        f.name = name;
        f.id = '_' + name;
        form.appendChild(f);
      }
      f.value = value;
    }
    ensureField('subject', '[DIZHAO Website] New inquiry');
    ensureField('template', 'table');
    ensureField('next', window.location.href.split('#')[0] + '?sent=1');

    form.addEventListener('submit', function (e) {
      // 不 preventDefault → 表單直接 POST 到 FormSubmit
      // FormSubmit 處理後會自動 redirect 回 ?sent=1
      var btn = document.getElementById('contact-submit');
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
      }
    });
  }

  // 顯示「已送出」訊息（如果有 ?sent=1）
  function showSentMessage() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
      var lang = document.documentElement.getAttribute('data-lang') || 'zh';
      var msg = (lang === 'en')
        ? '✓ Message sent! We will get back to you within one business day.'
        : '✓ 訊息已送出！我們會在 1 個工作天內回覆您。';
      // 用自訂對話框（不用 alert，體驗較好）
      showToast(msg, 'success');
      // 清掉 query string（避免重整又出現）
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  function showToast(msg, type) {
    var toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);' +
      'background:' + (type === 'success' ? '#D4A849' : '#14181d') + ';' +
      'color:#FAF7F0;padding:16px 32px;border-radius:2px;font-size:15px;font-weight:500;' +
      'box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:9999;letter-spacing:0.5px;' +
      'animation:slideDown 0.3s ease-out;';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

  function ready() {
    getFormStatus();
    showSentMessage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();