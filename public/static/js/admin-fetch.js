/**
 * KOIST Admin Fetch Helper — attaches CSRF token from cookie to all admin API calls.
 * This script should be loaded before other admin JS modules.
 */
(function() {
  'use strict';

  function getCsrfToken() {
    const match = document.cookie.match(/(?:^|;\s*)koist_csrf=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : '';
  }

  // Override the global apiCall to include CSRF token
  const _origApiCall = window.apiCall;
  window.apiCall = async function(url, method, body) {
    method = method || 'GET';
    try {
      const opts = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
      };
      // Attach CSRF token for mutating requests
      if (method !== 'GET' && method !== 'HEAD') {
        opts.headers['X-CSRF-Token'] = getCsrfToken();
      }
      if (body) opts.body = JSON.stringify(body);
      const res = await fetch(url, opts);
      if (res.status === 401) { logout(); return null; }
      if (res.status === 403) {
        const err = await res.json().catch(() => ({}));
        if (err.error && err.error.includes('CSRF')) {
          alert('세션이 만료되었습니다. 페이지를 새로고침합니다.');
          location.reload();
          return null;
        }
      }
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return null;
    }
  };

  // Helper for multipart uploads (images) — also needs CSRF token
  window.apiUpload = async function(url, formData) {
    try {
      const opts = {
        method: 'POST',
        headers: { 'X-CSRF-Token': getCsrfToken() },
        credentials: 'same-origin',
        body: formData,
      };
      const res = await fetch(url, opts);
      if (res.status === 401) { logout(); return null; }
      return await res.json();
    } catch (err) {
      console.error('Upload Error:', err);
      return null;
    }
  };
})();
