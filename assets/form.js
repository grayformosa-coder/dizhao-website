// DIZHAO Contact Form Handler
// Uses Web3Forms (https://web3forms.com) for email forwarding
// First-time setup: visit the dashboard once to confirm your access key.
(function () {
  'use strict';

  function bindForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = document.getElementById('contact-submit');
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
      }

      var data = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        var lang = document.documentElement.getAttribute('data-lang') || 'zh';
        if (result.success) {
          var msg = (lang === 'en')
            ? '✓ Message sent! We will get back to you within one business day.'
            : '✓ 訊息已送出！我們會在 1 個工作天內回覆您。';
          showToast(msg, 'success');
          form.reset();
        } else {
          var errMsg = (lang === 'en')
            ? '✗ Send failed. Please try again or email us directly.'
            : '✗ 送出失敗，請稍後再試或直接寄 Email。';
          showToast(errMsg, 'error');
          if (btn) {
            btn.disabled = false;
            btn.style.opacity = '1';
          }
        }
      })
      .catch(function () {
        var lang = document.documentElement.getAttribute('data-lang') || 'zh';
        var errMsg = (lang === 'en')
          ? '✗ Network error. Please try again.'
          : '✗ 網路錯誤，請稍後再試。';
        showToast(errMsg, 'error');
        if (btn) {
          btn.disabled = false;
          btn.style.opacity = '1';
        }
      });
    });
  }

  function showToast(msg, type) {
    var toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);' +
      'background:' + (type === 'success' ? '#D4A849' : '#8B0000') + ';' +
      'color:#FAF7F0;padding:16px 32px;border-radius:2px;font-size:15px;font-weight:500;' +
      'box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:9999;letter-spacing:0.5px;' +
      'opacity:0;transition:opacity 0.3s, transform 0.3s;' +
      'transform:translateX(-50%) translateY(-20px);';
    document.body.appendChild(toast);
    // 觸發進場
    requestAnimationFrame(function() {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    // 3 秒後淡出
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindForm);
  } else {
    bindForm();
  }
})();