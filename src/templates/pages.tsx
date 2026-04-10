// KOIST - Service & Content Page Templates (v5 - Full Fluid Responsive)
import type { SettingsMap, Department, DepPage, Notice, FAQ, ProgressItem } from '../types';

/* ────────────── Service Detail Page ────────────── */
export function servicePage(dept: Department, pages: DepPage[], currentPage: DepPage | null, settings: SettingsMap) {
  const s = settings;
  return `
  <!-- Page Header -->
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden" style="padding:var(--space-xl) 0">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\"20\\" height=\\"20\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Ccircle cx=\\"1\\" cy=\\"1\\" r=\\"1\\" fill=\\"rgba(255,255,255,0.03)\\"%2F%3E%3C/svg%3E')]"></div>
    <div class="relative fluid-container">
      <nav class="flex items-center text-slate-400 f-text-xs" style="gap:var(--space-sm); margin-bottom:var(--space-sm)">
        <a href="/" class="hover:text-white transition-colors">홈</a>
        <i class="fas fa-chevron-right text-[8px] text-slate-600"></i>
        <a href="/services/${dept.slug}" class="hover:text-white transition-colors">${dept.name}</a>
        ${currentPage ? `<i class="fas fa-chevron-right text-[8px] text-slate-600"></i><span class="text-white">${currentPage.title}</span>` : ''}
      </nav>
      <div class="flex items-center" style="gap:var(--space-sm)">
        <div class="rounded-lg flex items-center justify-center" style="width:clamp(36px,3vw,44px); height:clamp(36px,3vw,44px); background:${dept.color}20">
          <i class="fas ${dept.icon}" style="color:${dept.color}; font-size:var(--text-xl)"></i>
        </div>
        <div>
          <h1 class="text-white font-bold f-text-xl">${currentPage ? currentPage.title : dept.name}</h1>
          <p class="text-slate-400 f-text-xs" style="margin-top:2px">${dept.description || ''}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Content -->
  <section class="bg-[#F8FAFC]" style="padding:var(--space-xl) 0">
    <div class="fluid-container">
      <div class="flex flex-col lg:flex-row" style="gap:clamp(1rem, 2vw, 1.5rem)">

        <!-- Sidebar -->
        ${pages.length > 1 ? `
        <aside class="shrink-0" style="width:clamp(180px, 15vw, 224px)">
          <div class="bg-white rounded-xl border border-slate-200 overflow-hidden sticky shadow-sm" style="top:calc(var(--gnb-h) + var(--space-sm))">
            <div class="bg-primary text-white font-semibold f-text-sm" style="padding:var(--space-sm) var(--space-md)">${dept.name}</div>
            <nav style="padding:var(--space-xs)">
              ${pages.filter(p => p.is_active).map(p => `
              <a href="/services/${dept.slug}/${p.slug}" 
                 class="block rounded-lg transition-colors f-text-sm ${currentPage?.id === p.id ? 'bg-accent/10 text-accent font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
                 style="padding:var(--space-sm) var(--space-md)">
                ${p.title}
              </a>
              `).join('')}
            </nav>
          </div>
        </aside>
        ` : ''}

        <!-- Main -->
        <div class="flex-1 min-w-0">
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm" style="padding:clamp(1rem, 2.5vw, 2rem)">
            <div class="prose prose-slate max-w-none prose-headings:text-primary prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-accent" style="font-size:var(--text-sm)">
              ${currentPage ? currentPage.content : (pages.length > 0 ? pages[0].content : '<p class="text-slate-400">콘텐츠가 준비 중입니다.</p>')}
            </div>
          </div>

          <!-- CTA -->
          <div class="bg-gradient-to-r from-primary to-primary-light rounded-xl shadow-md" style="margin-top:var(--space-md); padding:var(--space-md)">
            <div class="flex flex-col sm:flex-row items-center justify-between" style="gap:var(--space-md)">
              <div>
                <h3 class="font-bold text-white f-text-sm">${dept.name}에 대해 궁금하신 점이 있으신가요?</h3>
                <p class="text-slate-400 f-text-xs" style="margin-top:2px">전문 상담원이 친절하게 안내해 드립니다.</p>
              </div>
              <div class="flex" style="gap:var(--space-sm)">
                <a href="tel:${s.phone || '02-586-1230'}" class="inline-flex items-center bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition-colors shadow shadow-accent/20 f-text-xs" style="gap:var(--space-xs); padding:var(--space-sm) var(--space-md)">
                  <i class="fas fa-phone" style="font-size:10px"></i> ${s.phone || '02-586-1230'}
                </a>
                <a href="/support/inquiry" class="inline-flex items-center bg-white/10 text-white rounded-lg font-semibold border border-white/20 hover:bg-white/15 transition-colors f-text-xs" style="gap:var(--space-xs); padding:var(--space-sm) var(--space-md)">
                  <i class="fas fa-envelope" style="font-size:10px"></i> 상담문의
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ────────────── Notice List ────────────── */
export function noticeListPage(notices: Notice[], page: number, total: number, perPage: number) {
  const totalPages = Math.ceil(total / perPage);
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden" style="padding:var(--space-xl) 0">
    <div class="relative fluid-container">
      <h1 class="text-white font-bold flex items-center f-text-xl" style="gap:var(--space-sm)">
        <i class="fas fa-bullhorn text-blue-400"></i>공지사항
      </h1>
    </div>
  </section>
  <section class="bg-[#F8FAFC]" style="padding:var(--space-xl) 0">
    <div class="fluid-container" style="max-width:min(1100px, 100% - var(--container-pad) * 2)">
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table class="w-full">
          <thead><tr class="bg-primary text-slate-300 f-text-xs">
            <th class="text-left w-14 font-medium" style="padding:var(--space-sm) var(--space-md)">번호</th>
            <th class="text-left font-medium" style="padding:var(--space-sm) var(--space-md)">제목</th>
            <th class="text-center w-20 font-medium hidden sm:table-cell" style="padding:var(--space-sm) var(--space-md)">조회수</th>
            <th class="text-center w-24 font-medium" style="padding:var(--space-sm) var(--space-md)">작성일</th>
          </tr></thead>
          <tbody>
            ${notices.map((n, i) => `
            <tr class="border-t border-slate-100 hover:bg-blue-50/30 transition-colors">
              <td class="text-slate-400 f-text-xs" style="padding:var(--space-sm) var(--space-md)">${n.is_pinned ? '<span class="text-red-500 font-bold">공지</span>' : (total - (page - 1) * perPage - i)}</td>
              <td style="padding:var(--space-sm) var(--space-md)"><a href="/support/notice/${n.id}" class="text-slate-800 hover:text-accent transition-colors font-medium f-text-sm">${n.title}</a></td>
              <td class="text-center text-slate-400 hidden sm:table-cell f-text-xs" style="padding:var(--space-sm) var(--space-md)">${n.views}</td>
              <td class="text-center text-slate-400 f-text-xs" style="padding:var(--space-sm) var(--space-md)">${n.created_at?.split('T')[0] || ''}</td>
            </tr>
            `).join('')}
            ${notices.length === 0 ? '<tr><td colspan="4" class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0">등록된 공지사항이 없습니다.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
      ${totalPages > 1 ? `
      <div class="flex justify-center" style="gap:var(--space-xs); margin-top:var(--space-lg)">
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
        <a href="/support/notice?page=${p}" class="flex items-center justify-center rounded-lg font-medium f-text-xs ${p === page ? 'bg-accent text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)">${p}</a>
        `).join('')}
      </div>` : ''}
    </div>
  </section>`;
}

/* ────────────── Notice Detail ────────────── */
export function noticeDetailPage(notice: Notice) {
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden" style="padding:var(--space-xl) 0">
    <div class="relative fluid-container">
      <nav class="flex items-center text-slate-400 f-text-xs" style="gap:var(--space-sm); margin-bottom:var(--space-sm)">
        <a href="/" class="hover:text-white">홈</a><i class="fas fa-chevron-right text-[8px] text-slate-600"></i>
        <a href="/support/notice" class="hover:text-white">공지사항</a><i class="fas fa-chevron-right text-[8px] text-slate-600"></i>
        <span class="text-white">상세</span>
      </nav>
      <h1 class="text-white font-bold f-text-xl">${notice.title}</h1>
      <div class="text-slate-400 f-text-xs" style="margin-top:var(--space-xs)">${notice.created_at?.split('T')[0] || ''} · 조회수 ${notice.views}</div>
    </div>
  </section>
  <section class="bg-[#F8FAFC]" style="padding:var(--space-xl) 0">
    <div class="fluid-container" style="max-width:min(900px, 100% - var(--container-pad) * 2)">
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm" style="padding:clamp(1rem, 2.5vw, 2rem)">
        <div class="prose prose-slate max-w-none prose-headings:text-primary" style="font-size:var(--text-sm)">${notice.content}</div>
      </div>
      <div class="text-center" style="margin-top:var(--space-md)">
        <a href="/support/notice" class="inline-flex items-center bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors f-text-sm" style="gap:var(--space-xs); padding:var(--space-sm) var(--space-md)"><i class="fas fa-list f-text-xs"></i> 목록</a>
      </div>
    </div>
  </section>`;
}

/* ────────────── FAQ ────────────── */
export function faqPage(faqs: FAQ[]) {
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden" style="padding:var(--space-xl) 0">
    <div class="relative fluid-container">
      <h1 class="text-white font-bold flex items-center f-text-xl" style="gap:var(--space-sm)">
        <i class="fas fa-circle-question text-teal-400"></i>자주 묻는 질문
      </h1>
    </div>
  </section>
  <section class="bg-[#F8FAFC]" style="padding:var(--space-xl) 0">
    <div class="fluid-container" style="max-width:min(900px, 100% - var(--container-pad) * 2); display:flex; flex-direction:column; gap:var(--space-sm)">
      ${faqs.map((f, i) => `
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <button onclick="toggleFaq(${i})" class="w-full flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors" style="padding:clamp(0.75rem, 1.5vw, 1.25rem)">
          <span class="font-medium text-slate-800 flex items-center f-text-sm" style="gap:var(--space-sm)">
            <span class="bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0 f-text-xs" style="width:clamp(20px,2vw,24px); height:clamp(20px,2vw,24px); font-weight:700">Q</span>
            ${f.question}
          </span>
          <i class="fas fa-chevron-down text-slate-400 transition-transform ml-3 shrink-0 f-text-xs" id="faq-icon-${i}"></i>
        </button>
        <div id="faq-body-${i}" class="hidden" style="padding:0 clamp(0.75rem, 1.5vw, 1.25rem) clamp(0.75rem, 1.5vw, 1.25rem)">
          <div class="text-slate-600 leading-relaxed f-text-sm" style="padding-left:calc(clamp(20px,2vw,24px) + var(--space-sm))">${f.answer}</div>
        </div>
      </div>
      `).join('')}
      ${faqs.length === 0 ? '<p class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0">등록된 FAQ가 없습니다.</p>' : ''}
    </div>
  </section>
  <script>
    function toggleFaq(i) {
      var body = document.getElementById('faq-body-' + i);
      var icon = document.getElementById('faq-icon-' + i);
      body.classList.toggle('hidden');
      icon.style.transform = body.classList.contains('hidden') ? '' : 'rotate(180deg)';
    }
  </script>`;
}

/* ────────────── Inquiry ────────────── */
export function inquiryPage(settings: SettingsMap) {
  const s = settings;
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden" style="padding:var(--space-xl) 0">
    <div class="relative fluid-container">
      <h1 class="text-white font-bold flex items-center f-text-xl" style="gap:var(--space-sm)">
        <i class="fas fa-envelope text-amber-400"></i>온라인 상담문의
      </h1>
    </div>
  </section>
  <section class="bg-[#F8FAFC]" style="padding:var(--space-xl) 0">
    <div class="fluid-container" style="max-width:min(720px, 100% - var(--container-pad) * 2)">
      <div class="bg-accent/5 rounded-lg border border-accent/10" style="padding:var(--space-md); margin-bottom:var(--space-md)">
        <p class="text-accent f-text-sm"><i class="fas fa-info-circle mr-1"></i> 빠른 상담은 <strong>${s.phone || '02-586-1230'}</strong>으로 연락주시면 더욱 빠르게 안내받으실 수 있습니다.</p>
      </div>
      <form id="inquiryForm" class="bg-white rounded-xl border border-slate-200 shadow-sm" style="padding:clamp(1rem, 2.5vw, 2rem)">
        <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:var(--space-md); margin-bottom:var(--space-md)">
          <div>
            <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">이름 <span class="text-red-500">*</span></label>
            <input type="text" name="name" required class="w-full border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors f-text-sm" style="padding:var(--space-sm) var(--space-md)">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">회사명</label>
            <input type="text" name="company" class="w-full border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors f-text-sm" style="padding:var(--space-sm) var(--space-md)">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">이메일</label>
            <input type="email" name="email" class="w-full border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors f-text-sm" style="padding:var(--space-sm) var(--space-md)">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">연락처</label>
            <input type="tel" name="phone" class="w-full border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors f-text-sm" style="padding:var(--space-sm) var(--space-md)">
          </div>
        </div>
        <div style="margin-bottom:var(--space-md)">
          <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">제목 <span class="text-red-500">*</span></label>
          <input type="text" name="subject" required class="w-full border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors f-text-sm" style="padding:var(--space-sm) var(--space-md)">
        </div>
        <div style="margin-bottom:var(--space-lg)">
          <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">문의 내용 <span class="text-red-500">*</span></label>
          <textarea name="message" rows="5" required class="w-full border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y transition-colors f-text-sm" style="padding:var(--space-sm) var(--space-md)"></textarea>
        </div>
        <button type="submit" id="inquiryBtn" class="w-full bg-accent hover:bg-accent-dark text-white rounded-lg font-semibold transition-colors f-text-sm" style="padding:var(--space-sm) 0"><i class="fas fa-paper-plane mr-1 f-text-xs"></i> 문의하기</button>
        <div id="inquiryMsg" class="hidden rounded-lg f-text-sm" style="margin-top:var(--space-md); padding:var(--space-sm) var(--space-md)"></div>
      </form>
    </div>
  </section>
  <script>
    document.getElementById('inquiryForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      var btn = document.getElementById('inquiryBtn');
      var msg = document.getElementById('inquiryMsg');
      var form = e.target;
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> 전송 중...';
      try {
        var body = {};
        new FormData(form).forEach(function(v, k) { body[k] = v; });
        var res = await fetch('/api/inquiries', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
        var data = await res.json();
        if (data.success) {
          msg.className = 'rounded-lg f-text-sm bg-green-50 text-green-700 border border-green-200';
          msg.style.cssText = 'margin-top:var(--space-md); padding:var(--space-sm) var(--space-md)';
          msg.innerHTML = '<i class="fas fa-check-circle mr-1"></i> 문의가 접수되었습니다.';
          form.reset();
        } else {
          msg.className = 'rounded-lg f-text-sm bg-red-50 text-red-700 border border-red-200';
          msg.style.cssText = 'margin-top:var(--space-md); padding:var(--space-sm) var(--space-md)';
          msg.textContent = data.error || '전송에 실패했습니다.';
        }
      } catch(err) {
        msg.className = 'rounded-lg f-text-sm bg-red-50 text-red-700 border border-red-200';
        msg.style.cssText = 'margin-top:var(--space-md); padding:var(--space-sm) var(--space-md)';
        msg.textContent = '서버 연결 실패';
      }
      msg.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane mr-1"></i> 문의하기';
    });
  </script>`;
}

/* ────────────── Progress (Full-featured with Pagination & Search) ────────────── */
export function progressPage(items: ProgressItem[], page: number = 1, total: number = 0, perPage: number = 15, search: string = '', statusFilter: string = '') {
  const totalPages = Math.ceil(total / perPage);
  const startNum = total - (page - 1) * perPage;

  // Build pagination URL helper
  function pageUrl(p: number) {
    const params = new URLSearchParams();
    params.set('page', String(p));
    if (search) params.set('q', search);
    if (statusFilter) params.set('status', statusFilter);
    return '/support/progress?' + params.toString();
  }

  // Status badge color helper
  function statusBadge(status: string) {
    if (status === '평가완료') return 'bg-green-50 text-green-700 border-green-200';
    if (status === '평가진행') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (status === '평가접수') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-50 text-slate-600 border-slate-200';
  }

  return `
  <!-- Page Header -->
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden" style="padding:var(--space-xl) 0">
    <div class="relative fluid-container">
      <h1 class="text-white font-bold flex items-center f-text-xl" style="gap:var(--space-sm)">
        <i class="fas fa-chart-bar text-emerald-400"></i>CC평가 현황
      </h1>
      <p class="text-slate-400 f-text-sm" style="margin-top:var(--space-xs)">총 <strong class="text-white">${total}</strong>건의 평가 현황</p>
    </div>
  </section>

  <!-- Content -->
  <section class="bg-[#F8FAFC]" style="padding:var(--space-xl) 0">
    <div class="fluid-container">

      <!-- Search & Filter Bar -->
      <form method="GET" action="/support/progress" class="bg-white rounded-xl border border-slate-200 shadow-sm" style="padding:var(--space-md); margin-bottom:var(--space-md)">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center" style="gap:var(--space-sm)">
          <!-- Status filter -->
          <select name="status" class="border border-slate-200 rounded-lg bg-slate-50 f-text-sm" style="padding:var(--space-sm) var(--space-md)" onchange="this.form.submit()">
            <option value="">전체 상태</option>
            <option value="평가진행" ${statusFilter === '평가진행' ? 'selected' : ''}>평가진행</option>
            <option value="평가접수" ${statusFilter === '평가접수' ? 'selected' : ''}>평가접수</option>
            <option value="평가완료" ${statusFilter === '평가완료' ? 'selected' : ''}>평가완료</option>
          </select>
          <!-- Search -->
          <div class="flex-1 relative">
            <input type="text" name="q" value="${search}" placeholder="제품명 검색..." class="w-full border border-slate-200 rounded-lg bg-slate-50 f-text-sm" style="padding:var(--space-sm) var(--space-md); padding-right:2.5rem">
            <button type="submit" class="absolute right-0 top-0 bottom-0 text-slate-400 hover:text-accent transition-colors" style="padding:0 var(--space-md)">
              <i class="fas fa-search f-text-sm"></i>
            </button>
          </div>
          ${search || statusFilter ? '<a href="/support/progress" class="shrink-0 text-slate-500 hover:text-red-500 transition-colors f-text-xs" style="padding:var(--space-sm)"><i class="fas fa-times mr-1"></i>필터 초기화</a>' : ''}
        </div>
      </form>

      <!-- Data Table -->
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-primary text-slate-300 f-text-xs">
                <th class="text-center font-medium" style="padding:var(--space-sm) var(--space-md); width:50px">번호</th>
                <th class="text-left font-medium" style="padding:var(--space-sm) var(--space-md)">제품명</th>
                <th class="text-center font-medium" style="padding:var(--space-sm) var(--space-md); width:80px">보증등급</th>
                <th class="text-center font-medium hidden sm:table-cell" style="padding:var(--space-sm) var(--space-md); width:80px">인증구분</th>
                <th class="text-center font-medium hidden md:table-cell" style="padding:var(--space-sm) var(--space-md); width:80px">신청구분</th>
                <th class="text-center font-medium" style="padding:var(--space-sm) var(--space-md); width:90px">진행상태</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((p, i) => `
              <tr class="border-t border-slate-100 hover:bg-blue-50/30 transition-colors">
                <td class="text-center text-slate-400 f-text-xs" style="padding:var(--space-sm) var(--space-md)">${startNum - i}</td>
                <td style="padding:var(--space-sm) var(--space-md)">
                  <span class="font-medium text-slate-800 f-text-sm">${p.product_name}</span>
                </td>
                <td class="text-center" style="padding:var(--space-sm) var(--space-md)">
                  <span class="inline-block bg-slate-100 text-slate-700 rounded font-mono font-medium f-text-xs" style="padding:2px var(--space-sm)">${p.assurance_level || '-'}</span>
                </td>
                <td class="text-center text-slate-600 hidden sm:table-cell f-text-xs" style="padding:var(--space-sm) var(--space-md)">${p.cert_type || '-'}</td>
                <td class="text-center text-slate-600 hidden md:table-cell f-text-xs" style="padding:var(--space-sm) var(--space-md)">${p.eval_type || '-'}</td>
                <td class="text-center" style="padding:var(--space-sm) var(--space-md)">
                  <span class="inline-flex items-center gap-1 rounded-full border font-medium f-text-xs ${statusBadge(p.status)}" style="padding:2px var(--space-sm)">
                    <span class="w-1.5 h-1.5 rounded-full ${p.status === '평가완료' ? 'bg-green-500' : p.status === '평가진행' ? 'bg-blue-500' : 'bg-amber-500'}"></span>
                    ${p.status}
                  </span>
                </td>
              </tr>
              `).join('')}
              ${items.length === 0 ? `<tr><td colspan="6" class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0">
                <i class="fas fa-search text-slate-300" style="font-size:2rem; margin-bottom:var(--space-sm); display:block"></i>
                ${search ? '검색 결과가 없습니다.' : '등록된 현황이 없습니다.'}
              </td></tr>` : ''}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      ${totalPages > 1 ? `
      <div class="flex flex-col sm:flex-row justify-between items-center" style="margin-top:var(--space-lg); gap:var(--space-md)">
        <p class="text-slate-500 f-text-xs">${total}건 중 ${(page - 1) * perPage + 1}~${Math.min(page * perPage, total)}건 표시 (${page}/${totalPages} 페이지)</p>
        <div class="flex items-center" style="gap:var(--space-xs)">
          ${page > 1 ? `<a href="${pageUrl(1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 f-text-xs" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)" title="처음"><i class="fas fa-angles-left"></i></a>
          <a href="${pageUrl(page - 1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 f-text-xs" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)" title="이전"><i class="fas fa-chevron-left"></i></a>` : ''}
          ${Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
            .map((p, idx, arr) => {
              let dots = idx > 0 && p - arr[idx - 1] > 1 ? '<span class="text-slate-400 f-text-xs" style="padding:0 var(--space-xs)">…</span>' : '';
              return dots + `<a href="${pageUrl(p)}" class="flex items-center justify-center rounded-lg font-medium f-text-xs ${p === page ? 'bg-accent text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)">${p}</a>`;
            }).join('')}
          ${page < totalPages ? `<a href="${pageUrl(page + 1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 f-text-xs" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)" title="다음"><i class="fas fa-chevron-right"></i></a>
          <a href="${pageUrl(totalPages)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 f-text-xs" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)" title="맨끝"><i class="fas fa-angles-right"></i></a>` : ''}
        </div>
      </div>` : ''}
    </div>
  </section>`;
}

/* ────────────── Embedded Progress Table (for service sub-pages) ────────────── */
export function serviceProgressContent(items: ProgressItem[], page: number = 1, total: number = 0, perPage: number = 15, search: string = '', statusFilter: string = '') {
  const totalPages = Math.ceil(total / perPage);
  const startNum = total - (page - 1) * perPage;

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    params.set('page', String(p));
    if (search) params.set('q', search);
    if (statusFilter) params.set('status', statusFilter);
    return '?' + params.toString();
  }

  function statusBadge(status: string) {
    if (status === '평가완료') return 'bg-green-50 text-green-700 border-green-200';
    if (status === '평가진행') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (status === '평가접수') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-50 text-slate-600 border-slate-200';
  }

  return `
    <h2 class="font-bold text-primary f-text-lg" style="margin-bottom:var(--space-md)">CC평가 현황 <span class="text-slate-400 font-normal f-text-sm">(총 ${total}건)</span></h2>

    <!-- Search & Filter -->
    <form method="GET" class="bg-slate-50 rounded-lg border border-slate-200" style="padding:var(--space-md); margin-bottom:var(--space-md)">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center" style="gap:var(--space-sm)">
        <select name="status" class="border border-slate-200 rounded-lg bg-white f-text-sm" style="padding:var(--space-sm) var(--space-md)" onchange="this.form.submit()">
          <option value="">전체 상태</option>
          <option value="평가진행" ${statusFilter === '평가진행' ? 'selected' : ''}>평가진행</option>
          <option value="평가접수" ${statusFilter === '평가접수' ? 'selected' : ''}>평가접수</option>
          <option value="평가완료" ${statusFilter === '평가완료' ? 'selected' : ''}>평가완료</option>
        </select>
        <div class="flex-1 relative">
          <input type="text" name="q" value="${search}" placeholder="제품명 검색..." class="w-full border border-slate-200 rounded-lg bg-white f-text-sm" style="padding:var(--space-sm) var(--space-md); padding-right:2.5rem">
          <button type="submit" class="absolute right-0 top-0 bottom-0 text-slate-400 hover:text-accent transition-colors" style="padding:0 var(--space-md)">
            <i class="fas fa-search f-text-sm"></i>
          </button>
        </div>
        ${search || statusFilter ? '<a href="?" class="shrink-0 text-slate-500 hover:text-red-500 transition-colors f-text-xs" style="padding:var(--space-sm)"><i class="fas fa-times mr-1"></i>초기화</a>' : ''}
      </div>
    </form>

    <!-- Table -->
    <div class="rounded-lg border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-primary text-slate-300 f-text-xs">
              <th class="text-center font-medium" style="padding:var(--space-sm) var(--space-md); width:50px">번호</th>
              <th class="text-left font-medium" style="padding:var(--space-sm) var(--space-md)">제품명</th>
              <th class="text-center font-medium" style="padding:var(--space-sm) var(--space-md); width:80px">보증등급</th>
              <th class="text-center font-medium hidden sm:table-cell" style="padding:var(--space-sm) var(--space-md); width:80px">인증구분</th>
              <th class="text-center font-medium hidden md:table-cell" style="padding:var(--space-sm) var(--space-md); width:80px">신청구분</th>
              <th class="text-center font-medium" style="padding:var(--space-sm) var(--space-md); width:90px">진행상태</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((p, i) => `
            <tr class="border-t border-slate-100 hover:bg-blue-50/30 transition-colors">
              <td class="text-center text-slate-400 f-text-xs" style="padding:var(--space-sm) var(--space-md)">${startNum - i}</td>
              <td style="padding:var(--space-sm) var(--space-md)">
                <span class="font-medium text-slate-800 f-text-sm">${p.product_name}</span>
              </td>
              <td class="text-center" style="padding:var(--space-sm) var(--space-md)">
                <span class="inline-block bg-slate-100 text-slate-700 rounded font-mono font-medium f-text-xs" style="padding:2px var(--space-sm)">${p.assurance_level || '-'}</span>
              </td>
              <td class="text-center text-slate-600 hidden sm:table-cell f-text-xs" style="padding:var(--space-sm) var(--space-md)">${p.cert_type || '-'}</td>
              <td class="text-center text-slate-600 hidden md:table-cell f-text-xs" style="padding:var(--space-sm) var(--space-md)">${p.eval_type || '-'}</td>
              <td class="text-center" style="padding:var(--space-sm) var(--space-md)">
                <span class="inline-flex items-center gap-1 rounded-full border font-medium f-text-xs ${statusBadge(p.status)}" style="padding:2px var(--space-sm)">
                  <span class="w-1.5 h-1.5 rounded-full ${p.status === '평가완료' ? 'bg-green-500' : p.status === '평가진행' ? 'bg-blue-500' : 'bg-amber-500'}"></span>
                  ${p.status}
                </span>
              </td>
            </tr>
            `).join('')}
            ${items.length === 0 ? `<tr><td colspan="6" class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0">
              <i class="fas fa-search text-slate-300" style="font-size:2rem; margin-bottom:var(--space-sm); display:block"></i>
              ${search ? '검색 결과가 없습니다.' : '등록된 현황이 없습니다.'}
            </td></tr>` : ''}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    ${totalPages > 1 ? `
    <div class="flex flex-col sm:flex-row justify-between items-center" style="margin-top:var(--space-lg); gap:var(--space-md)">
      <p class="text-slate-500 f-text-xs">${total}건 중 ${(page - 1) * perPage + 1}~${Math.min(page * perPage, total)}건 표시 (${page}/${totalPages} 페이지)</p>
      <div class="flex items-center" style="gap:var(--space-xs)">
        ${page > 1 ? `<a href="${pageUrl(1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 f-text-xs" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)" title="처음"><i class="fas fa-angles-left"></i></a>
        <a href="${pageUrl(page - 1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 f-text-xs" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)" title="이전"><i class="fas fa-chevron-left"></i></a>` : ''}
        ${Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
          .map((p, idx, arr) => {
            let dots = idx > 0 && p - arr[idx - 1] > 1 ? '<span class="text-slate-400 f-text-xs" style="padding:0 var(--space-xs)">…</span>' : '';
            return dots + `<a href="${pageUrl(p)}" class="flex items-center justify-center rounded-lg font-medium f-text-xs ${p === page ? 'bg-accent text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)">${p}</a>`;
          }).join('')}
        ${page < totalPages ? `<a href="${pageUrl(page + 1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 f-text-xs" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)" title="다음"><i class="fas fa-chevron-right"></i></a>
        <a href="${pageUrl(totalPages)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 f-text-xs" style="width:clamp(28px,2.5vw,32px); height:clamp(28px,2.5vw,32px)" title="맨끝"><i class="fas fa-angles-right"></i></a>` : ''}
      </div>
    </div>` : ''}
  `;
}

/* ────────────── Downloads ────────────── */
export function downloadsPage(downloads: { id: number; title: string; description: string; file_name: string; category: string; download_count: number; created_at: string }[]) {
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden" style="padding:var(--space-xl) 0">
    <div class="relative fluid-container">
      <h1 class="text-white font-bold flex items-center f-text-xl" style="gap:var(--space-sm)">
        <i class="fas fa-download text-purple-400"></i>자료실
      </h1>
    </div>
  </section>
  <section class="bg-[#F8FAFC]" style="padding:var(--space-xl) 0">
    <div class="fluid-container" style="max-width:min(1100px, 100% - var(--container-pad) * 2); display:flex; flex-direction:column; gap:var(--space-sm)">
      ${downloads.map(d => `
      <div class="bg-white rounded-xl border border-slate-200 flex items-center justify-between hover:shadow-md hover:border-slate-300 transition-all" style="padding:var(--space-md); gap:var(--space-md)">
        <div class="flex items-center min-w-0" style="gap:var(--space-sm)">
          <div class="bg-purple-50 rounded-lg flex items-center justify-center shrink-0" style="width:clamp(30px,2.5vw,36px); height:clamp(30px,2.5vw,36px)"><i class="fas fa-file-lines text-purple-500 f-text-sm"></i></div>
          <div class="min-w-0">
            <h3 class="font-medium text-slate-800 truncate f-text-sm">${d.title}</h3>
            <p class="text-slate-400 f-text-xs" style="margin-top:2px">${d.file_name || ''} · ${d.created_at?.split('T')[0] || ''} · 다운로드 ${d.download_count}회</p>
          </div>
        </div>
        <a href="/api/downloads/${d.id}/file" class="shrink-0 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark transition-colors f-text-xs" style="padding:var(--space-xs) var(--space-sm)"><i class="fas fa-download mr-1"></i>다운로드</a>
      </div>
      `).join('')}
      ${downloads.length === 0 ? '<p class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0">등록된 자료가 없습니다.</p>' : ''}
    </div>
  </section>`;
}
