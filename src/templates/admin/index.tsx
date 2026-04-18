// KOIST - Admin Templates

export function adminLoginPage(error?: string) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>관리자 로그인 - KOIST</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <style>* { font-family: 'Noto Sans KR', sans-serif; }</style>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-4">
        <i class="fas fa-shield-halved text-blue-400 text-3xl"></i>
      </div>
      <h1 class="text-2xl font-bold text-white">KOIST 관리자</h1>
      <p class="text-slate-400 text-sm mt-1">한국정보보안기술원 웹사이트 관리 시스템</p>
    </div>
    
    <form id="loginForm" class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
      ${error ? `<div class="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm"><i class="fas fa-exclamation-circle mr-2"></i>${error}</div>` : ''}
      
      <div class="mb-5">
        <label class="block text-slate-300 text-sm font-medium mb-2">아이디</label>
        <div class="relative">
          <i class="fas fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input type="text" name="username" id="username" required autofocus
            class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="아이디를 입력하세요">
        </div>
      </div>
      
      <div class="mb-6">
        <label class="block text-slate-300 text-sm font-medium mb-2">비밀번호</label>
        <div class="relative">
          <i class="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input type="password" name="password" id="password" required
            class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="비밀번호를 입력하세요">
        </div>
      </div>
      
      <button type="submit" id="loginBtn"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
        <i class="fas fa-sign-in-alt"></i> 로그인
      </button>
      
      <div id="loginError" class="hidden mt-4 bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-lg text-sm"></div>
    </form>
    
    <p class="text-center text-slate-600 text-xs mt-6">&copy; KOIST Admin System</p>
  </div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('loginBtn');
      const errDiv = document.getElementById('loginError');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 로그인 중...';
      errDiv.classList.add('hidden');

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
          }),
        });
        const data = await res.json();
        if (data.success) {
          // Cookie is set by server (HttpOnly) — no client-side cookie needed
          // Always redirect to dashboard — password change is optional via account menu
          window.location.href = '/admin/dashboard';
        } else {
          errDiv.textContent = data.error || '로그인에 실패했습니다.';
          errDiv.classList.remove('hidden');
        }
      } catch (err) {
        errDiv.textContent = '서버 연결에 실패했습니다.';
        errDiv.classList.remove('hidden');
      }
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> 로그인';
    });
  </script>
</body>
</html>`;
}

export function changePasswordContent() {
  return `
    <h1 class="text-2xl font-bold text-gray-800 mb-6"><i class="fas fa-user-shield text-blue-500 mr-2"></i>계정 관리</h1>
    <div class="bg-white rounded-xl border border-gray-100 p-6">
      <div class="max-w-lg">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <i class="fas fa-key text-blue-500 text-lg"></i>
          </div>
          <div>
            <h2 class="font-bold text-gray-800">비밀번호 변경</h2>
            <p class="text-gray-400 text-sm">새로운 비밀번호를 설정하세요 (6자 이상)</p>
          </div>
        </div>
        
        <form id="changePwForm">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-1.5">현재 비밀번호</label>
            <input type="password" id="currentPw" required autocomplete="current-password"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="현재 비밀번호 입력">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-1.5">새 비밀번호</label>
            <input type="password" id="newPw" required minlength="6" autocomplete="new-password"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="6자 이상 입력">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-1.5">새 비밀번호 확인</label>
            <input type="password" id="confirmPw" required autocomplete="new-password"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="새 비밀번호 재입력">
          </div>
          <button type="submit" id="changeBtn" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2">
            <i class="fas fa-check"></i> 비밀번호 변경
          </button>
          <div id="msg" class="hidden mt-4 px-4 py-3 rounded-lg text-sm"></div>
        </form>
      </div>
    </div>
    <script>
      document.getElementById('changePwForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('msg');
        const newPw = document.getElementById('newPw').value;
        const confirmPw = document.getElementById('confirmPw').value;
        if (newPw !== confirmPw) {
          msg.className = 'mt-4 px-4 py-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-600';
          msg.textContent = '새 비밀번호가 일치하지 않습니다.';
          msg.classList.remove('hidden');
          return;
        }
        const btn = document.getElementById('changeBtn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 변경 중...';
        try {
          const csrfToken = (document.cookie.match(/(?:^|;\\s*)koist_csrf=([^;]*)/) || [])[1] || '';
          const res = await fetch('/api/admin/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
            credentials: 'same-origin',
            body: JSON.stringify({ current_password: document.getElementById('currentPw').value, new_password: newPw }),
          });
          const data = await res.json();
          if (data.success) {
            msg.className = 'mt-4 px-4 py-3 rounded-lg text-sm bg-green-50 border border-green-200 text-green-700';
            msg.textContent = '비밀번호가 성공적으로 변경되었습니다.';
            msg.classList.remove('hidden');
            document.getElementById('changePwForm').reset();
          } else {
            msg.className = 'mt-4 px-4 py-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-600';
            msg.textContent = data.error || '변경에 실패했습니다.';
            msg.classList.remove('hidden');
          }
        } catch (err) {
          msg.className = 'mt-4 px-4 py-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-600';
          msg.textContent = '서버 연결 실패';
          msg.classList.remove('hidden');
        }
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-check"></i> 비밀번호 변경';
      });
    </script>
  `;
}

export function adminDashboardPage(content: string, activeMenu = 'dashboard', logoUrl = '') {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: '대시보드', href: '/admin/dashboard' },
    { id: 'site-settings', icon: 'fa-cog', label: '사이트 설정', href: '/admin/site-settings' },
    { id: 'departments', icon: 'fa-building', label: '사업분야 관리', href: '/admin/departments' },
    { id: 'popups', icon: 'fa-window-restore', label: '팝업 관리', href: '/admin/popups' },
    { id: 'notices', icon: 'fa-bullhorn', label: '공지사항', href: '/admin/notices' },
    { id: 'progress', icon: 'fa-chart-bar', label: '평가현황', href: '/admin/progress' },
    { id: 'downloads', icon: 'fa-download', label: '자료실', href: '/admin/downloads' },
    { id: 'faqs', icon: 'fa-circle-question', label: 'FAQ', href: '/admin/faqs' },
    { id: 'inquiries', icon: 'fa-envelope', label: '상담문의', href: '/admin/inquiries' },
    { id: 'images', icon: 'fa-images', label: '이미지 관리', href: '/admin/images' },
    { id: 'about', icon: 'fa-info-circle', label: '소개 페이지', href: '/admin/about' },
    { id: 'sim-cert-types', icon: 'fa-robot', label: 'AI 시뮬레이터', href: '/admin/sim-cert-types' },
    { id: 'account', icon: 'fa-user-shield', label: '계정 관리', href: '/admin/change-password' },
  ];

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>관리자 - KOIST</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <style>
    * { font-family: 'Noto Sans KR', sans-serif; }
    .sidebar-link.active { background: rgba(59,130,246,0.1); color: #3B82F6; border-right: 3px solid #3B82F6; }
    .mobile-sidebar { transform: translateX(-100%); transition: transform 0.3s ease; }
    .mobile-sidebar.open { transform: translateX(0); }
    .mobile-sidebar-overlay { opacity: 0; visibility: hidden; transition: all 0.3s ease; }
    .mobile-sidebar-overlay.open { opacity: 1; visibility: visible; }
  </style>
  <script>
    // === Admin Utility Functions (must load before page scripts) ===
    async function logout() {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' });
      window.location.href = '/';
    }
    function getToken() {
      // Token is in HttpOnly cookie — not accessible from JS
      // This function kept for backward compatibility; API calls use credentials: 'same-origin'
      return '';
    }
    async function apiCall(url, method = 'GET', body = null) {
      try {
        const opts = {
          method,
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
        };
        if (body) opts.body = JSON.stringify(body);
        const res = await fetch(url, opts);
        if (res.status === 401) { logout(); return null; }
        return await res.json();
      } catch (err) {
        console.error('API Error:', err);
        return null;
      }
    }
  </script>
</head>
<body class="bg-gray-50 min-h-screen">
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 fixed top-0 left-0 bottom-0 z-30 overflow-y-auto hidden lg:block">
      <div class="p-5 border-b">
        <a href="/admin/dashboard" class="flex items-center gap-2">
          ${logoUrl && logoUrl.trim() !== '' && logoUrl !== '/static/images/logo.png' ? `
          <img src="${logoUrl}" alt="KOIST Admin" class="h-8 w-auto object-contain">
          ` : `
          <i class="fas fa-shield-halved text-blue-500 text-xl"></i>
          `}
          <div>
            <div class="font-bold text-gray-800 text-sm">KOIST Admin</div>
            <div class="text-[10px] text-gray-400">관리자 대시보드</div>
          </div>
        </a>
      </div>
      <nav class="p-3">
        ${menuItems.map(m => `
        <a href="${m.href}" class="sidebar-link flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${activeMenu === m.id ? 'active' : 'text-gray-600 hover:bg-gray-50'}">
          <i class="fas ${m.icon} w-4 text-center"></i> ${m.label}
        </a>
        `).join('')}
        <div class="border-t mt-3 pt-3">
          <a href="/" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50" target="_blank">
            <i class="fas fa-external-link-alt w-4 text-center"></i> 사이트 보기
          </a>
          <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50">
            <i class="fas fa-sign-out-alt w-4 text-center"></i> 로그아웃
          </button>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 lg:ml-64">
      <!-- Top bar -->
      <header class="bg-white border-b px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <button id="mobileSidebarBtn" class="lg:hidden p-2 text-gray-600"><i class="fas fa-bars"></i></button>
        <div></div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500"><i class="fas fa-user-circle mr-1"></i> 관리자</span>
        </div>
      </header>

      <!-- Content -->
      <div class="p-6">
        ${content}
      </div>
    </div>
  </div>

  <!-- Mobile sidebar overlay -->
  <div id="sidebarOverlay" class="mobile-sidebar-overlay fixed inset-0 bg-black/50 z-[25] lg:hidden" onclick="closeSidebar()"></div>
  
  <!-- Mobile sidebar (clone of desktop, shown on mobile) -->
  <aside id="mobileSidebar" class="mobile-sidebar fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-[35] overflow-y-auto lg:hidden">
    <div class="p-5 border-b flex justify-between items-center">
      <a href="/admin/dashboard" class="flex items-center gap-2">
        ${logoUrl && logoUrl.trim() !== '' && logoUrl !== '/static/images/logo.png' ? `
        <img src="${logoUrl}" alt="KOIST Admin" class="h-8 w-auto object-contain">
        ` : `
        <i class="fas fa-shield-halved text-blue-500 text-xl"></i>
        `}
        <div>
          <div class="font-bold text-gray-800 text-sm">KOIST Admin</div>
          <div class="text-[10px] text-gray-400">관리자 대시보드</div>
        </div>
      </a>
      <button onclick="closeSidebar()" class="p-1 text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
    </div>
    <nav class="p-3">
      ${menuItems.map(m => `
      <a href="${m.href}" class="sidebar-link flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${activeMenu === m.id ? 'active' : 'text-gray-600 hover:bg-gray-50'}">
        <i class="fas ${m.icon} w-4 text-center"></i> ${m.label}
      </a>
      `).join('')}
      <div class="border-t mt-3 pt-3">
        <a href="/" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50" target="_blank">
          <i class="fas fa-external-link-alt w-4 text-center"></i> 사이트 보기
        </a>
        <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50">
          <i class="fas fa-sign-out-alt w-4 text-center"></i> 로그아웃
        </button>
      </div>
    </nav>
  </aside>

  <script>
    // Mobile sidebar toggle
    function openSidebar() {
      document.getElementById('mobileSidebar').classList.add('open');
      document.getElementById('sidebarOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      document.getElementById('mobileSidebar').classList.remove('open');
      document.getElementById('sidebarOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('mobileSidebarBtn')?.addEventListener('click', openSidebar);
  </script>
</body>
</html>`;
}

export function adminDashboardContent(stats: { notices: number; departments: number; popups: number; inquiries: number; downloads: number; faqs: number }) {
  return `
    <h1 class="text-2xl font-bold text-gray-800 mb-6"><i class="fas fa-chart-pie text-blue-500 mr-2"></i>대시보드</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-sm">사업분야</span>
          <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><i class="fas fa-building text-blue-500"></i></div>
        </div>
        <div class="text-3xl font-bold text-gray-800">${stats.departments}</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-sm">공지사항</span>
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><i class="fas fa-bullhorn text-green-500"></i></div>
        </div>
        <div class="text-3xl font-bold text-gray-800">${stats.notices}</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-sm">활성 팝업</span>
          <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center"><i class="fas fa-window-restore text-purple-500"></i></div>
        </div>
        <div class="text-3xl font-bold text-gray-800">${stats.popups}</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-sm">상담문의</span>
          <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center"><i class="fas fa-envelope text-orange-500"></i></div>
        </div>
        <div class="text-3xl font-bold text-gray-800">${stats.inquiries}</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-sm">자료실</span>
          <div class="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center"><i class="fas fa-download text-teal-500"></i></div>
        </div>
        <div class="text-3xl font-bold text-gray-800">${stats.downloads}</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-sm">FAQ</span>
          <div class="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center"><i class="fas fa-circle-question text-yellow-500"></i></div>
        </div>
        <div class="text-3xl font-bold text-gray-800">${stats.faqs}</div>
      </div>
    </div>
    <div class="bg-white rounded-xl p-6 border border-gray-100">
      <h2 class="font-bold text-gray-700 mb-4">빠른 관리</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <a href="/admin/site-settings" class="p-4 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors"><i class="fas fa-cog text-blue-500 text-xl mb-2 block"></i><span class="text-sm text-gray-600">사이트 설정</span></a>
        <a href="/admin/popups" class="p-4 bg-gray-50 rounded-lg text-center hover:bg-purple-50 transition-colors"><i class="fas fa-window-restore text-purple-500 text-xl mb-2 block"></i><span class="text-sm text-gray-600">팝업 관리</span></a>
        <a href="/admin/notices" class="p-4 bg-gray-50 rounded-lg text-center hover:bg-green-50 transition-colors"><i class="fas fa-bullhorn text-green-500 text-xl mb-2 block"></i><span class="text-sm text-gray-600">공지사항</span></a>
        <a href="/admin/inquiries" class="p-4 bg-gray-50 rounded-lg text-center hover:bg-orange-50 transition-colors"><i class="fas fa-envelope text-orange-500 text-xl mb-2 block"></i><span class="text-sm text-gray-600">문의확인</span></a>
      </div>
    </div>
  `;
}
